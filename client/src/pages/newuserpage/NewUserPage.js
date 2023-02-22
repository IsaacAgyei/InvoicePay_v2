import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { authToken, refresh, logoutUser, revokeLoginStatus } from '../../redux';
import { useTheme } from '@mui/material'

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

function PricingContent(props) {
  const dispatch = useDispatch()
  const theme = useTheme()
  
  useEffect(() => {
    dispatch(authToken())
  }, [dispatch])

  function handlePayment(url) {
    window.open(url, '_blank')
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(revokeLoginStatus())
  }

  function showUserData() {
    return (props.data).map(invoice => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={invoice.invoice_id}
              paddingBottom={4}
            >
              <Card>
                <CardHeader
                  title="Invoice Summary"
                  subheader={`Invoice ID: ${invoice.invoice_id}`}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: invoice.paid? theme.palette.primary.light : theme.palette.secondary.light,
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color={invoice.paid?theme.palette.primary.main:theme.palette.secondary.main}>
                      ${(invoice.amount_due/100)}
                    </Typography>
                  </Box>
                  <ul>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="left"
                      key={invoice.invoice_id}
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Invoice Number: {invoice.invoice_id}
                    </Typography>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="left"
                      key={invoice.invoice_id}
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Billed To: {invoice.customer_email}
                    </Typography>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="left"
                      key={invoice.invoice_id}
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Amount Due: ${invoice.amount_due/100}
                    </Typography>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="left"
                      key={invoice.invoice_id}
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Amount Paid: ${invoice.amount_paid/100}
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth 
                    variant="contained"
                    sx={{
                      borderRadius: 20,
                      bgcolor: !invoice.paid ? theme.palette.primary.main : theme.palette.primary.light,
                      ':hover': {
                        bgcolor: !invoice.paid ? theme.palette.primary.main : theme.palette.primary.light
                      }
                    }}
                    onClick={() => handlePayment(invoice.hosted_invoice_url)}
                  >
                    <Typography
                      fontWeight="bold"
                      color={!props.paid? theme.palette.secondary.main:theme.palette.common.black}
                    >
                      {!invoice.paid? "Pay Invoice":"View Paid Invoice"}
                    </Typography>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )
      }

    function sheildUserData(){
      return (
        <React.Fragment>
          <Typography>User Data Cannot Be Displayed</Typography>
        </React.Fragment>
      )
    }
    function loadingUserData(){
      return (
        <React.Fragment>
          <Typography>LOADING...</Typography>
        </React.Fragment>
      )
    }
  
    function refeshAuth(){
      switch(props.authRefreshToken) {
        case true: return (
          dispatch(authToken()),
          showUserData()
        )
        case false: return (
          sheildUserData()
        )
        default: return
      }
    }
  
    function displayData(){
      switch (props.authJwt) {
        case true: return (
          showUserData()
        )
        case false: return (
          dispatch(refresh()),
          refeshAuth()
        );
        default: return (
          loadingUserData()
        )
      }
    }
  
    const userpageDisplayWrapper = () => {
      if(props.logout === false) {
        return (
          <Box>
            {displayData()}
          </Box>
        )
    } else {
      return ( <Navigate to="/" /> )
    }
  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Invoice Pay
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav>
          <Button onClick={() => handleLogout()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Invoices
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Risus in hendrerit gravida rutrum quisque non Porttitor lacus luctus accumsan 
          tortor posuere ac ut consequat. 
          Urna porttitor rhoncus dolor purus non. Hendrerit gravida rutrum quisque non. 
        </Typography>
      </Container>
      
      <Container maxWidth="lg" component="main">
        <Grid 
          container 
          direction="row"
          spacing={0} 
          alignItems="center" 
          justifyContent="center"
          sx={{ overflowX: "scroll", maxHeight:500 }}
        >
          {userpageDisplayWrapper()}
        </Grid>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    data: state.authToken.invoiceDetails,
    authJwt: state.authToken.authorized,
    authRefreshToken: state.refresh.authorized,
    logout: state.logout.logoutStatus
  }
}

export default connect(mapStateToProps)(PricingContent)