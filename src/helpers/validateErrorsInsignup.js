const validateErrorsInsignup = (email, password, matchPassword) => {
  const errors = []
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  const sizePassword = password.length
  const minSizePassword = 4
  const validateEmail = email.match(emailRegex)

  if (password !== matchPassword) {
    errors.push({ error: 'The Password Does Not Match.' })
  }

  if (sizePassword <= minSizePassword) {
    errors.push({ error: 'The Passwords Must Be At Least 4 Characters.' })
  }

  if (!validateEmail) {
    errors.push({ error: 'The Email Address Is Incorrect.' })
  }

  return errors
}

module.exports = validateErrorsInsignup
