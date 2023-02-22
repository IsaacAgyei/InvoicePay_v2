import { SIGNUP_USER_REQUEST, 
         SIGNUP_USER_SUCCESS, 
         SIGNUP_USER_FAILURE } from "./signupType"

const initialState = {
  loading: false,
  message: ""
}

const signupReducer = (state = initialState, action) => {
  switch(action.type){
    case SIGNUP_USER_REQUEST: return {
      ...state,
      loading: true
    }
    case SIGNUP_USER_SUCCESS: return {
      ...state,
      loading: false,
      message: action.payload

    }
    case SIGNUP_USER_FAILURE: return {
      ...state,
      loading: false,
      message: action.payload
    }
    default: return state
  }
}

export default signupReducer