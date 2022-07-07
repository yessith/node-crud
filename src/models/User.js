const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

// * Encrypt Password with bcrypt
UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  const encryptedPass = await bcrypt.hash(password, salt)
  return encryptedPass
}

// * Compare Password Encryption
UserSchema.methods.matchPassword = async function (password) {
  const matchPass = await bcrypt.compare(password, this.password)
  return matchPass
}

module.exports = model('Users', UserSchema)
