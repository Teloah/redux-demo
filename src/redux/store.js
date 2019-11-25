import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import transactionsReducer, * as fromTransactions from './transactions'
import uiReducer, * as fromUI from './ui'
import * as fromWorkflow from './workflow'

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

export function initStore() {
  const sagaMiddleware = createSagaMiddleware()
  const storeWithMiddleware = applyMiddleware(logger, sagaMiddleware)(createStore)
  const store = storeWithMiddleware(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  const rootSaga = function*() {
    yield all([fork(fromTransactions.transactionsRootSaga), fork(fromWorkflow.congratulations)])
  }

  sagaMiddleware.run(rootSaga)

  return store
}

export const getTransactionsByType = type => ({ transactions }) => {
  return fromTransactions.getTransactionsByType(type)(transactions)
}
export const getTransactionAmountByType = type => ({ transactions }) => {
  return fromTransactions.getTransactionAmountByType(type)(transactions)
}
export const getBestRating = ({ transactions }) => fromTransactions.getBestRating(transactions)

export const getSelected = ({ ui }) => fromUI.getSelected(ui)
export const getIsLoading = ({ ui }) => fromUI.getIsLoading(ui)
