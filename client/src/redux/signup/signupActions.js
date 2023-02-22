import axios from '../../api/axios.js'
import { SIGNUP_USER_REQUEST, 
         SIGNUP_USER_SUCCESS, 
         SIGNUP_USER_FAILURE } from "./signupType"

const signupUserRequest = () => {
  return {
    type: SIGNUP_USER_REQUEST
  }
}

const signupUserSuccess = message => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: message
  }
}

const signupUserFailure = (error) => {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  }
}

export const signupUser = (username, email, password) => {
  return (dispatch) => {
    dispatch(signupUserRequest)
    axios.post("/api/auth/signup",{
      username: username,
      email: email,
      password: password
    })
    .then(response => {
      const message = response.data.message
      console.log(response.data.message)
      dispatch(signupUserSuccess(message))
    })
    .catch(error => {
      const err = error.response.data.message
      console.log(`ERROR: ${err}`)
      dispatch(signupUserFailure(err))
    })
  }
}