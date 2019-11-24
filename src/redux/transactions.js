import { combineReducers } from 'redux'
import numeral from 'numeral'
import { createSelector } from 'reselect'

const ADD_TRANSACTION = 'transactions / ADD'

export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  payload: {
    transaction
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
    const amnt = list.reduce((result, transaction) => {
      return result + +transaction.amount
    }, 0)
    return numeral(amnt).format('0.00')
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
