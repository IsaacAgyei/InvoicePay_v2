import {REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE} from './refreshType.js'
import axios from '../../api/axios.js'

const refreshTokenSuccess = (authorized) => {
  return {
    type: REFRESH_TOKEN_SUCCESS,
    payload: authorized
  }
}

const refreshTokenFailure = (authorized) => {
  return {
    type: REFRESH_TOKEN_FAILURE,
    payload: authorized
  }
}

export const refresh = () => {
  return (dispatch) => {
    axios.get("/api/auth/refreshtoken", { withCredentials: true, headers: {"x-refresh-access": localStorage.getItem("rid")}}
    )
    .then(response => {
      localStorage.setItem("sid",response.data.accessToken)
      const authorized = response.data.authorized
      dispatch(refreshTokenSuccess(authorized))
    })
    .catch(error => {
      const authorized = false
      console.log(`refresh Action Error: ${error} `)
      dispatch(refreshTokenFailure(authorized))
    })
  }
}