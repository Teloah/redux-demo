import { combineReducers } from 'redux'
import numeral from 'numeral'
import { createSelector } from 'reselect'
import { all, fork, takeEvery, retry, put } from 'redux-saga/effects'
import faker from 'faker'

import { sleep } from '../utils/sleep'
import { startLoading, endLoading } from './ui'
import { generator } from '../utils/generator'

export const ADD_TRANSACTION = 'transactions / ADD'
export const GENERATE_TRANSACTIONS = 'transactions / generate'

export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  payload: {
    transaction
  }
})

export const generateTransactions = count => ({
  type: GENERATE_TRANSACTIONS,
  meta: {
    count
  }
})

const createTransactionReducer = type => (state = [], action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      if (action.payload.transaction.type !== type) return state
      return [...state, action.payload.transaction]
    default:
      return state
  }
}

export default combineReducers({
  atm: createTransactionReducer('ATM'),
  pos: createTransactionReducer('POS'),
  ecomm: createTransactionReducer('EComm')
})

const createSelectors = type => {
  const listSelector = state => state[type]

  const amountSelector = createSelector(listSelector, list => {
    console.log('recalculating', type)
    const amount = list.reduce((result, transaction) => {
      return result + +transaction.amount
    }, 0)
    return numeral(amount).format('0.00')
  })

  return {
    list: listSelector,
    amount: amountSelector
  }
}

const selectors = {
  atm: createSelectors('atm'),
  pos: createSelectors('pos'),
  ecomm: createSelectors('ecomm')
}

export const getTransactionsByType = type => selectors[type.toLowerCase()].list

export const getTransactionAmountByType = type => selectors[type.toLowerCase()].amount

const flakyGenerator = () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.1) {
      resolve(generator())
    } else {
      reject(new Error('Failed to generate transaction'))
    }
  })
}

function* nameLoader(card) {
  yield sleep(150)
  const name = faker.name.findName()
  const account = faker.finance.account()
  yield put({
    type: 'transactions / cardholder',
    payload: { card, name, account }
  })
}

function* generateWorker(action) {
  console.log('generating in saga', action)
  yield put(startLoading())
  for (let i = 0; i < action.meta.count; i++) {
    yield sleep(50)

    try {
      const transaction = yield retry(2, 50, flakyGenerator)
      yield put(addTransaction(transaction))
      yield fork(nameLoader, transaction.card)
    } catch (e) {
      yield put({ type: 'transactions / FAILED', error: e.message })
    }
  }
  yield put(endLoading())
}

function* generateWatcher() {
  yield takeEvery(GENERATE_TRANSACTIONS, generateWorker)
}

export function* transactionsRootSaga() {
  yield all([fork(generateWatcher)])
}
