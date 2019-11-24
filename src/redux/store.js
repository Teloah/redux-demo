import { createStore, combineReducers } from 'redux'
import transactionsReducer, * as fromTransactions from './transactions'
import uiReducer, * as fromUI from './ui'

const reducer = combineReducers({
  transactions: transactionsReducer,
  ui: uiReducer
})

export function initStore() {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store
}

export const getTransactionsByType = type => ({ transactions }) => {
  return fromTransactions.getTransactionsByType(type)(transactions)
}

export const getTransactionAmountByType = type => ({ transactions }) => {
  return fromTransactions.getTransactionAmountByType(type)(transactions)
}

export const getSelected = ({ ui }) => fromUI.getSelected(ui)
