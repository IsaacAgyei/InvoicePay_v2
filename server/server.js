require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors')
const db = require('./models')
const app = express()
const PORT = process.env.PORT

db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully Connected to MongoDB')
  })
  .catch(err =>{
    console.error("Connection err", err)
    process.exit()
  })

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'tab'
});

store.on('error', function(error) {
  console.log(error);
});

app.use(cookieParser())
app.use(session({
  name:"sid",
  secret: "tempSecrect",
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    sameSite: "lax", 
    secure: false, 
    maxAge: 1200000
  }
}))

app.use(cors( {
  origin: [process.env.AUTH, process.env.USERDATA, "http://localhost:5000/api/auth/login"],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('./routes/auth.routes')(app);
require('./routes/refresh.routes')(app);
require('./routes/user.routes')(app);

app.get('/', (req, res) => {
  res.json({message: "Welcome to InPay"})
})

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT: ${PORT}`)
})