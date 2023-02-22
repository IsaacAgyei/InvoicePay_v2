import React from 'react'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { logoutUser, revokeLoginStatus } from '../../redux'
import { Typography, useTheme } from '@mui/material'

function LogoutButton(){
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(revokeLoginStatus())
  }

  return (
    <Button
      sx={{
        width: 120, 
        height: 35, 
        borderRadius: '20px 20px 20px 20px',
        bgcolor: theme.palette.secondary.main
      }} 
      color="success"
      variant='contained'
      onClick={() => handleLogout()}
    >
      <Typography
        color={theme.palette.secondary.contrastText}
        fontWeight="bold"
      >
        Logout
      </Typography> 
    </Button>
  )
}

export default LogoutButton