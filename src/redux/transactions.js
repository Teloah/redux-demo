import { combineReducers } from 'redux'
import numeral from 'numeral'

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

export const getTransactionsByType = type => ({ transactions }) => transactions[type]
export const getTransactionAmountByType = type => ({ transactions }) => {
  console.log('recalculating', type)
  const amnt = transactions[type].reduce((result, transaction) => {
    return result + +transaction.amount
  }, 0)
  return numeral(amnt).format('0.00')
}
