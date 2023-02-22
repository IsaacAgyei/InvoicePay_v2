const { verifySignUp } = require('../middleware')
const controller = require('../controllers/auth.controller.js')

module.exports = function(app) {
 app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token", 
      "Origin", 
      "Content-Type", 
      "Accept", 
      "OPTIONS", 
      "POST",
      "GET", 
      "Access-Control-Allow-Methods"
    )
    next()
  })

  app.post('/api/auth/signup',[verifySignUp.checkDuplicateUsernameOrEmail], controller.signup)
  app.post("/api/auth/login", controller.signin)
  app.get("/api/auth/logout", controller.logout )
}


