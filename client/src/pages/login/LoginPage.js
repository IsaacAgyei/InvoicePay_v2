import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Navigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material';
import { loginUser, revokeLogoutStatus } from '../../redux'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Invoice Pay
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Login(props) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    if(!props.loginStatus || props.loginStatus === null){
      return (
        <Typography 
          fontSize={20}
          color={theme.palette.error.main}
        >
          {props.error}
        </Typography>)
    } else if (props.loginStatus === true) {
        return ( <Navigate to='/userdata'/> )  
      }
  }

  const loginDetails = (username, password) => {
    dispatch(revokeLogoutStatus())
    dispatch(loginUser(username, password))
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              value={username}
              onChange={handleUsername}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              value={password}
              onChange={handlePassword}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => loginDetails(username, password) }
            >
              Sign In
            </Button>

            {handleLogin()}

            <Grid container>
              <Grid item>
                <Link href="http://localhost:3000/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

const mapStateToProps = state => {
  return {
    loginStatus: state.login.loginStatus,
    error: state.login.message
  }
}

export default connect(mapStateToProps)(Login)