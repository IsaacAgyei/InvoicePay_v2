import { AUTH_USER_SUCCESS, AUTH_USER_FAILURE } from './authType.js'

const initialState = {
  authorized: null,
  invoiceDetails: [],
  hostedUrls: ""
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_SUCCESS: return {
      ...state,
      authorized: action.payload.authorized,
      invoiceDetails: action.payload.invoices,
      hostedUrls: action.payload.hostedUrls
    }
    case AUTH_USER_FAILURE: return {
      ...state,
      authorized: action.payload
    }
    default: return state
  }
}

export default authReducer