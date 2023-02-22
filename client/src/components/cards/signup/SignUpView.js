import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import { connect } from 'react-redux'
import UserInput from '../../inputs/userCredentialsView.js'
import SignupButton from '../../buttons/SignupButton.js'
import "../../../styles/css/App.css"

function SignUpView(props) {
  const theme = useTheme()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  function handleUsername(e){
    setUsername(e.target.value)
  }
  function handleEmail(e){
    setEmail(e.target.value)
  }
  function handlePassword(e){
    setPassword(e.target.value)
  }
  
  return (
    <Box 
      sx={{ 
        bgcolor: theme.palette.secondary.light,
        height: 555,
        width: 457
      }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item={true} xs={8} paddingTop={4}>
          <Typography 
            color={theme.palette.secondary.contrastText} 
            fontSize={35} 
            height={30} 
            align="center">
              Username
          </Typography>
          <UserInput 
            inputValue={username}
            handleChange={handleUsername}
            inputType="text"
          />
        </Grid>

        <Grid item={true} xs={8} paddingTop={2}>
          <Typography 
            color={theme.palette.secondary.contrastText} 
            height={30} 
            fontSize={35} 
            align="center">
              Email
          </Typography>
          <UserInput 
            inputValue={email}
            handleChange={handleEmail}
            inputType="email"
          />
        </Grid>

        <Grid item={true} xs={8} paddingTop={2}>
          <Typography 
            color={theme.palette.secondary.contrastText} 
            height={30} 
            fontSize={35} 
            align="center">
              Password
          </Typography>
          <UserInput
            inputValue={password}
            handleChange={handlePassword}
            inputType="password"
          />
        </Grid>
      </Grid>

      <Grid 
        container 
        justifyContent="center" 
        alignItems='flex-end'
        height="auto"
      >
        <Grid 
          item={true} 
          xs={8} 
          paddingTop={9.8}
        >
          <SignupButton
            userCreds={{username, email, password}}
          />
          <Typography 
            fontSize={30} 
            color={theme.palette.error.main}
          >
            {props.message}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    message: state.signup.message
  }
}

export default connect(mapStateToProps)(SignUpView)



