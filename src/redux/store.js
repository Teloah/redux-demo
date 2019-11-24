import { createStore, combineReducers } from 'redux'
import transactionsReducer from './transactions'

const reducer = combineReducers({
  transactions: transactionsReducer
})

export function initStore() {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store
}
