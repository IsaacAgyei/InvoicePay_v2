import React, {useState} from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material'
import UserInput from '../../inputs/userCredentialsView.js'
import LoginButton from '../../buttons/LoginButton.js'
import Grid from '@mui/material/Grid'

function LoginView() {
  const theme = useTheme()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  return (
    <Box sx={{ 
      bgcolor: theme.palette.primary.dark,
      height: 555,
      width: 457
    }}>
      <Typography
        color={theme.palette.common.white}
        paddingTop={5}
        paddingLeft={5}
        fontSize={35}
      >
        Welcome!
      </Typography>

      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={8} paddingTop={10}>
          <Typography 
            color={theme.palette.primary.contrastText} 
            height={30} 
            fontSize={35} 
            align="center">
              Username
          </Typography>
          <UserInput 
            inputValue={username}
            handleChange={handleUsername}
            inputType="text"
          />
        </Grid>

        <Grid item xs={8} paddingTop={2}>
          <Typography 
            color={theme.palette.primary.contrastText} 
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

        <Grid 
          container 
          justifyContent="center" 
          alignItems='flex-end'
          height="auto"
        >
          <Grid 
            item={true} 
            xs={8} 
            paddingTop={9.5}
          >
            <LoginButton 
              loginButtonLabel="Log In"
              userInputValues={{username, password}}
              /> 
          </Grid>
        </Grid>

      </Grid>
    </Box>
  )
}
export default LoginView