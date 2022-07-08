module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next()

    req.flash('error_msg', 'unauthorized user')
    res.redirect('/auth/signin')
  },

  checkLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/tasks')
    }
    next()
  }
}
