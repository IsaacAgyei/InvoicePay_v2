import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import { connect, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import { authToken, refresh } from '../../redux'
import { useTheme } from '@mui/material'
import LogoutButton from '../../components/buttons/LogoutButton'
import InvoiceView from '../../components/invoices/InvoiceView'
import "../../styles/css/App.css"

function UserPage(props){
  const dispatch = useDispatch()
  const theme = useTheme()

  useEffect(() => {
    dispatch(authToken())
  }, [dispatch])

  function showUserData() {
    return (props.data).map(invoice => (
      <InvoiceView 
        invoiceId={invoice.invoice_id}
        customerEmail={invoice.customer_email}
        amountDue={invoice.amount_due}
        amountPaid={invoice.amount_paid}
        url={invoice.hosted_invoice_url}
        paid={invoice.paid}
      />
    ))
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
          <Box className="userpage-background">
            <Box className='main-banner' height={65}>
              <Grid 
                container
                justifyContent="flex-end"
                alignItems="center"
              > 
                <Grid item={true} xs={6}>
                  <Typography 
                    color={theme.palette.primary.contrastText} fontSize={50}
                  >
                    Welcome
                  </Typography>
                </Grid>
                <Grid item={true} paddingRight={1} paddingLeft={0}>
                  <LogoutButton />
                </Grid>
              </Grid>
            </Box>
            
            <Grid 
              container 
              justifyContent="center" 
              alignItems="center" 
              sx={{overflowY: "scroll", maxHeight: "500px"}}
            >
              <Grid item={true} >
                {displayData()}
              </Grid>
            </Grid>
          </Box>
        )
    } else {
      return ( <Navigate to="/" /> )
    }
  }
  
  return (
    userpageDisplayWrapper()
  ) 
}

const mapStateToProps = state => {
  return {
    data: state.authToken.invoiceDetails,
    authJwt: state.authToken.authorized,
    authRefreshToken: state.refresh.authorized,
    logout: state.logout.logoutStatus
  }
}
export default connect(mapStateToProps)(UserPage)