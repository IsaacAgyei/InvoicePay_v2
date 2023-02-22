import axios from '../../api/axios.js'
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REVOKE } from "./loginType.js"

const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST
  }
}

const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  }
}

const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error
  }
}


const revokeStatus = (status) => {
  return {
    type: LOGIN_USER_REVOKE,
    payload: status
  }
}

export const revokeLoginStatus = () => {
  return (dispatch) => {
    dispatch(revokeStatus(false))
  }
}

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch(loginUserRequest)
    axios.post('/api/auth/login',{
      username: username,
      password: password
    })
    .then(response => {
      localStorage.setItem("sid", response.data.accessToken)
      localStorage.setItem("rid", response.data.refreshToken)
      const user = response.data
      dispatch(loginUserSuccess(user))
    })
    .catch(error => {
      const err = error.response.data.publicMessage
      console.log(`ERROR_RESPONSE: ${err}`)
      dispatch(loginUserFailure(err))
    })
  }
}
