import { createStore, combineReducers, applyMiddleware } from 'redux'
import transactionsReducer, * as fromTransactions from './transactions'
import uiReducer, * as fromUI from './ui'

const reducer = combineReducers({
  transactions: transactionsReducer,
  ui: uiReducer
})

const logger = store => next => action => {
  console.group('logger')
  console.log('state before:', store.getState())
  console.log('action:', JSON.stringify(action, null, 2))
  const result = next(action)
  console.log('state after:', store.getState())
  console.groupEnd()
  return result
}

const storeWithMiddleware = applyMiddleware(logger, fromTransactions.loadingMiddleware)(createStore)

export function initStore() {
  const store = storeWithMiddleware(
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
export const getIsLoading = ({ ui }) => fromUI.getIsLoading(ui)
