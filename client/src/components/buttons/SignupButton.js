import React from 'react'
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { signupUser } from '../../redux'

function SignupButton(props) {
  const theme = useTheme()
  const dispatch = useDispatch()

  return (
      <Button 
        sx={{ bgcolor: theme.palette.primary.dark,
              height: "auto",
              width: 300,
              borderRadius: '20px 20px 0px 0px',
              ':hover': {
                bgcolor: 'primary.dark', // theme.palette.primary.dark
                color: 'white',
              },
            }}
        variant="contained"
        fullWidth={true}
        onClick={() => dispatch(signupUser(props.userCreds.username, props.userCreds.email, props.userCreds.password))}
      >
        <Typography
          sx={{color: theme.palette.primary.contrastText}}
          align="center"
          variant="h5"
        >
          SIGN UP
        </Typography>
      </Button>
  )
}

export default SignupButton