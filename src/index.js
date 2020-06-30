require('./models/users')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('../src/routes/authRoutes')
const bodyParser = require('body-parser')
const requireAuth = require('./middleware/requireAuth')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(authRoutes)

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