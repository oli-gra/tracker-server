const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const mongoUri = `mongodb+srv://admin:${process.env.MONGO_ADMIN_PW}@cluster0-ukzos.mongodb.net/<dbname>?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
mongoose.connection.on('error', (err) => {
  console.error('Cannot connect :(')
})

app.get('/', (req, res) => {
  res.send('Hey!! :-)')
})

app.listen(3000, () => {
  console.log('listening on 3000')
})