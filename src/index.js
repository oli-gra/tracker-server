require('./models/users')
require('./models/track')
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middleware/requireAuth')

const app = express()
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = `mongodb+srv://admin:${process.env.MONGO_ADMIN_PW}@cluster0-ukzos.mongodb.net/<dbname>?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', (err) => {
  console.error('Cannot connect :(')
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Hey ${req.user.email} :)`)
})

app.listen(3000, () => {
  console.log('Listening on 3000...')
})