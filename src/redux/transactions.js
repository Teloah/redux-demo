import { combineReducers } from 'redux'
import numeral from 'numeral'
import { createSelector } from 'reselect'
import { all, fork, takeEvery, retry, put, call } from 'redux-saga/effects'
import faker from 'faker'

import { sleep } from '../utils/sleep'
import { startLoading, endLoading } from './ui'
import { generator } from '../utils/generator'

export const ADD_TRANSACTION = 'transactions / ADD'
export const GENERATE_TRANSACTIONS = 'transactions / generate'
export const RATINGS = 'transactions / ratings'
export const CARDHOLDER = 'transactions / cardholder'

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

const listsReducer = combineReducers({
  atm: createTransactionReducer('ATM'),
  pos: createTransactionReducer('POS'),
  ecomm: createTransactionReducer('EComm')
})

const cardholdersReducer = (state = {}, action) => {
  switch (action.type) {
    case CARDHOLDER:
      return { ...state, [action.payload.record.account]: action.payload.record }
    default:
      return state
  }
}

const ratingsReducer = (state = {}, action) => {
  switch (action.type) {
    case RATINGS:
      return { ...state, [action.payload.account]: action.payload.ratings }
    default:
      return state
  }
}

export default combineReducers({
  lists: listsReducer,
  cardholders: cardholdersReducer,
  ratings: ratingsReducer
})

const createSelectors = type => {
  const listSelector = state => state.lists[type]

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

export const getRatings = ({ ratings }) => ratings

export const getBestRating = createSelector(getRatings, ratings => {
  return Object.keys(ratings).reduce((result, account) => {
    const bestRating = ratings[account].reduce((result, rating) => {
      return result.rating > rating.rating ? result : rating
    }, {})
    return result.rating > bestRating.rating ? result : bestRating
  }, {})
})

const flakyGenerator = () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.1) {
      resolve(generator())
    } else {
      reject(new Error('Failed to generate transaction'))
    }
  })
}

async function firstCreditAgency(record) {
  await sleep(Math.random() * 200)
  return {
    account: record.account,
    name: record.name,
    agency: 'First Credit',
    rating: Math.random() * 100
  }
}
async function secondCreditAgency(record) {
  await sleep(Math.random() * 200)
  return {
    account: record.account,
    name: record.name,
    agency: 'Second Credit',
    rating: Math.random() * 150
  }
}
async function bestCreditAgency(record) {
  await sleep(Math.random() * 200)
  return {
    account: record.account,
    name: record.name,
    agency: 'Best Credit',
    rating: Math.random() * 300
  }
}

function* nameLoader(card) {
  yield sleep(150)
  const name = faker.name.findName()
  const account = faker.finance.account()
  const record = { card, name, account }
  yield put({
    type: CARDHOLDER,
    payload: { record }
  })
  const ratings = yield all([
    call(firstCreditAgency, record),
    call(secondCreditAgency, record),
    call(bestCreditAgency, record)
  ])
  yield put({
    type: RATINGS,
    payload: { account, ratings }
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
