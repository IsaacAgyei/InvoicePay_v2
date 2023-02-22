import React from "react";
import { Card, CardContent, Typography, CardActions, Button, useTheme } from "@mui/material";

function InvoiceView(props) {
  const theme = useTheme()

  function handlePayment(url) {
    window.open(url, '_blank')
  }

  const invoiceSummaryKeys = (key, value) => {
    return (
      <Typography 
        fontSize={20} 
        color={theme.palette.common.black}
      > 
        {key}{value}
      </Typography>
    )
  }
  
  return (
    <Card>
      <CardContent 
        sx={{
          border: 1, 
          width: 490, 
          borderRadius: 10, 
          bgcolor: !props.paid?theme.palette.primary.light :theme.palette.secondary.light
        }}
      >
        {invoiceSummaryKeys("Invoice Number: ",props.invoiceId)}
        <br />
        {invoiceSummaryKeys("Billed To: ", props.customerEmail)}
        <br />
        {invoiceSummaryKeys("Amount: $", props.amountDue)}
        <br />
        {invoiceSummaryKeys("Amount Paid: $", props.amountPaid)}

        <CardActions>
          <Button
            onClick={() => handlePayment(props.url)}
            variant="contained"
            fullWidth={true}
            sx={{
              borderRadius: 20,
              bgcolor: !props.paid?theme.palette.primary.main:theme.palette.primary.lighter,
              ':hover': {
                bgcolor: !props.paid?theme.palette.primary.main:theme.palette.primary.lighter
              }
            }}
          >
            <Typography
              fontWeight="bold"
              color={!props.paid? theme.palette.secondary.main:theme.palette.common.black}
            >
              {!props.paid? "Pay Invoice":"View Paid Invoice"}
            </Typography>
          </Button>
        </CardActions>

      </CardContent>
    </Card>
  )
}

export default InvoiceView