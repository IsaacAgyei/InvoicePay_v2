import axios from '../../api/axios.js'
import { LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_REVOKE } from "./logoutType.js"

const logoutUserSuccess = (logoutStatus) => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: logoutStatus
  }
}

const logoutUserFailure = (error) => {
  return {
    type: LOGOUT_USER_FAILURE,
    payload: error
  }
}

const revokeStatus = (status) => {
  return {
    type: LOGOUT_USER_REVOKE,
    payload: status
  }
}

export const revokeLogoutStatus = () => {
  return (dispatch) => {
    dispatch(revokeStatus(false))
  }
}
export const logoutUser = () => {
  return (dispatch) => {
    axios.get("/api/auth/logout", {
      withCredentials: true,
      headers: {"x-refresh-access": localStorage.getItem("rid")}
    })
    .then(response => {
      localStorage.removeItem("rid")
      localStorage.removeItem("sid")
      const logoutStatus = response.data.logoutStatus
      dispatch(logoutUserSuccess(logoutStatus))
      console.log(`${response.data.message}`)
    })
    .catch(error => {
      localStorage.removeItem("rid")
      localStorage.removeItem("sid")
      const err = error.response.data
      console.log(`ERROR_RESPONSE: ${err.message}`)
      dispatch(logoutUserFailure(err))
    })
  }
}