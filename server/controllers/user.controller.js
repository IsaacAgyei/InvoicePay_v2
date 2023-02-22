const stripe = require('stripe')(process.env.STRIPE)

exports.userData = async (req, res) => {
  const stripeInvoicesObject = await stripe.invoices.list({customer:req.userId.toUpperCase()})

  const invoiceDetails = stripeInvoicesObject.data.map((invoice) => {
        let invoiceCardInfo = {
          "amount_due": invoice.amount_due,
          "amount_paid": invoice.amount_paid,
          "currency": invoice.currency,
          "due_date": invoice.due_date,
          "invoice_id": invoice.id,
          "hosted_invoice_url": invoice.hosted_invoice_url,
          "customer_email": invoice.customer_email,
          "paid": invoice.paid
        }
        return invoiceCardInfo
      })
  const hostedUrls = invoiceDetails.map(invoice => {
    return invoice.hosted_invoice_url
  })

  res.status(200).send({hostedUrls: hostedUrls, invoices: invoiceDetails, authorized: true });
};