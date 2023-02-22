import React from 'react'
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { loginUser, revokeLogoutStatus } from '../../redux'

function LoginButton(props) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleLogin = () => {
    if(!props.loginStatus || props.loginStatus === null){
      return (
        <Typography 
          fontSize={30}
          color={theme.palette.warning.main}
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
    <Box>
      <Button 
        sx={{ bgcolor: theme.palette.secondary.light,
              height: "auto",
              width: 300,
              borderRadius: '20px 20px 0px 0px',
              ':hover': {
                bgcolor: theme.palette.secondary.light
              },
            }}
        variant="contained"
        fullWidth={true}
        onClick={() => loginDetails(props.userInputValues.username, props.userInputValues.password)}
      >
        <Typography
          sx={{color: theme.palette.secondary.contrastText}}
          align="center"
          variant="h5"
        >
          {props.loginButtonLabel}
        </Typography>
      </Button>
        {handleLogin()}
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    loginStatus: state.login.loginStatus,
    error: state.login.message
  }
}
export default connect(mapStateToProps)(LoginButton)