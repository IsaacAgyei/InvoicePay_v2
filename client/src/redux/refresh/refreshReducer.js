import {REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE} from './refreshType.js'

const initialState = {
  authorized: false
}


const refreshReducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_TOKEN_SUCCESS: return {
      ...state,
      authorized: action.payload
    }
    case REFRESH_TOKEN_FAILURE: return {
      ...state,
      authorized: action.payload
    }
    default: return state
  }
}

export default refreshReducer