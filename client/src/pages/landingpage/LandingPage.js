import React from "react"
import Box from "@mui/material/Box"
import SignUpView from '../../components/cards/signup/SignUpView.js'
import LoginView from "../../components/cards/login/LoginView.js";
import Grid from '@mui/material/Grid'; // Grid version 1
import { Typography, useTheme } from "@mui/material";
import "../../styles/css/App.css"

function LandingPage() {
  const theme = useTheme()
  return (
    <Box
      className={"Landing-Bg"}
    >
      <Typography
      align="center"
      color={theme.palette.common.white}
      fontSize={50}
      sx={{
        paddingBottom: 7,
      }}
      >
        Invoice Pay
      </Typography>
        <Grid 
          container 
          direction="row" 
          justifyContent="center" 
          alignItems="center"
        >
        <Grid item>
          <SignUpView />
        </Grid>
        <Grid item>
          <LoginView />
        </Grid>
      </Grid>
    </Box>
  )
}

export default LandingPage