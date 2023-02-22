import React from 'react'
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import store from '../redux/store.js'
import UserPage from '../pages/userpage/UserPage.js'
import { createTheme, ThemeProvider } from '@mui/material'
import SignUp from '../pages/signup/SignupPage.js'
import Login from '../pages/login/LoginPage.js'
import PricingContent from '../pages/newuserpage/NewUserPage.js'

const theme = createTheme({
  palette: {
    primary: {
      main: "#7643E2", // purple
      light: "#D7D0E5", // light purple
      lighter: "#FCFCFC", // ligher purple
      dark: "#7643E2", // dark purple
      contrastText: "#24FF00" // green
    },
    secondary: {
      main: "#24FF00", // green
      light: "#E3F8E0", // aqua
      dark: "#0B1510", // dark green
      contrastText: "#7643E2" // dark purple
    },
    warning: {
      main: "#fff700" // yellow
    },
    error: {
      main: "#ff3111"
    }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/user' element={<UserPage />}/>
          <Route path='/userdata' element={<PricingContent />}/>
        </Routes>
      </Provider>
    </ThemeProvider>
  );  
}

export default App;
