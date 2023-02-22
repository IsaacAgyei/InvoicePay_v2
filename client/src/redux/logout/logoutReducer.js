import { LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_REVOKE } from "./logoutType.js"

const initialState = {
  logoutStatus: false
}

const logoutReducer = (state= initialState, action) => {
  switch (action.type) {
    case LOGOUT_USER_SUCCESS: return {
      ...state,
      logoutStatus: action.payload
    }
    case LOGOUT_USER_FAILURE: return {
      ...state,
      logoutStatus: action.payload.logoutStatus
    }
    case LOGOUT_USER_REVOKE: return {
      ...state,
      logoutStatus: action.payload
    }
    default: return state
  }
}

export default logoutReducer