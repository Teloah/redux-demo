import { combineReducers } from 'redux'
import numeral from 'numeral'
import { createSelector } from 'reselect'
import { all, fork, takeEvery, put } from 'redux-saga/effects'

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

function* generateWorker(action) {
  console.log('generating in saga', action)
  yield put(startLoading())
  for (let i = 0; i < action.meta.count; i++) {
    yield sleep(50)
    yield put(addTransaction(generator()))
  }
  yield put(endLoading())
}

function* generateWatcher() {
  yield takeEvery(GENERATE_TRANSACTIONS, generateWorker)
}

export function* transactionsRootSaga() {
  yield all([fork(generateWatcher)])
}
