const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (input) {
  const user = this
  return new Promise((result, reject) => {
    bcrypt.compare(input, user.password, (err, isMatch) => {
      if (!isMatch) return reject(err)

      return result(true)
    })
  })
}

mongoose.model('User', userSchema)