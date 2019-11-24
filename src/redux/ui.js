import { combineReducers } from 'redux'

const TYPE_SELECTED = 'ui / selected'
const START_LOADING = 'ui / loading start'
const END_LOADING = 'ui / loading end'

export const typeSelected = type => ({
  type: TYPE_SELECTED,
  payload: {
    type
  }
})

export const startLoading = () => ({
  type: START_LOADING
})

export const endLoading = () => ({
  type: END_LOADING
})

const selectedReducer = (state = '', action) => {
  switch (action.type) {
    case TYPE_SELECTED:
      return action.payload.type
    default:
      return state
  }
}

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true
    case END_LOADING:
      return false
    default:
      return state
  }
}

export default combineReducers({
  selected: selectedReducer,
  loading: loadingReducer
})

export const getSelected = ({ selected }) => selected
export const getIsLoading = ({ loading }) => loading
