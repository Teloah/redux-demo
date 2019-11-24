import { combineReducers } from 'redux'

const TYPE_SELECTED = 'ui / selected'

export const typeSelected = type => ({
  type: TYPE_SELECTED,
  payload: {
    type
  }
})

const selectedReducer = (state = '', action) => {
  switch (action.type) {
    case TYPE_SELECTED:
      return action.payload.type
    default:
      return state
  }
}

export default combineReducers({
  selected: selectedReducer
})

export const getSelected = ({ selected }) => selected
