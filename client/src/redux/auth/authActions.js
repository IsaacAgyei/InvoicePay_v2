import axios from '../../api/axios.js'
import { AUTH_USER_SUCCESS, AUTH_USER_FAILURE } from './authType.js'

const authUserSuccess = (customerData) => {
  return {
    type: AUTH_USER_SUCCESS,
    payload: customerData
  }
}

const authUserFailure = (authorized) => {
  return {
    type: AUTH_USER_FAILURE,
    payload: authorized
  }
}

export const authToken = () => {
  return (dispatch) => {
   axios.get('/api/userdata', {
      withCredentials: true,
      headers: {'x-access-token': localStorage.getItem("sid")}
    })
    .then(response => {
      const customerData = response.data
      dispatch(authUserSuccess(customerData))
    })
    .catch(error => {
      const authorized = false
      dispatch(authUserFailure(authorized))
    })
  }
}

