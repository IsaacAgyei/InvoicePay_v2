import { combineReducers } from "redux";
import signupReducer from './signup/signupReducer.js'
import loginReducer from './login/loginReducer.js'
import refreshReducer from "./refresh/refreshReducer.js"
import authReducer from "./auth/authReducer.js"
import logoutReducer from "./logout/logoutReducer.js"

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  authToken: authReducer,
  refresh: refreshReducer,
  logout: logoutReducer
})

export default rootReducer