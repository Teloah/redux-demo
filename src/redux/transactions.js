import { combineReducers } from 'redux'
import numeral from 'numeral'
import { createSelector } from 'reselect'

import { sleep } from '../utils/sleep'
import { startLoading, endLoading } from './ui'
import { generator } from '../utils/generator'

const ADD_TRANSACTION = 'transactions / ADD'
const GENERATE_TRANSACTIONS = 'transactions / generate'

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

export const loadingMiddleware = store => next => action => {
  if (action.type !== GENERATE_TRANSACTIONS) return next(action)

  console.log('generating in loadingMiddleware', action)

  const generateTransaction = () => {
    next(addTransaction(generator()))
  }

  const generate = async count => {
    next(startLoading())
    for (let i = 0; i < count; i++) {
      await sleep(50)
      generateTransaction()
    }
    next(endLoading())
  }

  generate(action.meta.count)

  return next(action)
}
