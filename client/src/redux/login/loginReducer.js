import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REVOKE } from "./loginType.js"

const initialState = {
  loading: false,
  username: "",
  message: false,
  accessToken: "",
  loginStatus: null
}

const loginReducer = (state = initialState, action) => {
  switch(action.type){
    case LOGIN_USER_REQUEST: return {
      ...state,
      loading: true
    }
    case LOGIN_USER_SUCCESS: return {
      ...state,
      username: action.payload.username,
      accessToken: action.payload.accessToken,
      loginStatus: action.payload.loginStatus
    }
    case LOGIN_USER_FAILURE: return {
      ...state,
      username: undefined,
      message: action.payload,
      accessToken: undefined
    }
    case LOGIN_USER_REVOKE: return {
      ...state,
      loginStatus: action.payload
    }
    default: return state
  }
}

export default loginReducer