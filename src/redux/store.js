import { createStore } from 'redux'

const reducer = (state, action) => {
  return action.type
}

export function initStore() {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store
}
