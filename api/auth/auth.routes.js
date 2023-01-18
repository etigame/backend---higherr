const express = require('express')
const {
  login,
  loginViaGoogle,
  signup,
  signupViaGoogle,
  logout,
} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/loginViaGoogle', loginViaGoogle)
router.post('/signup', signup)
router.post('/signupViaGoogle', signupViaGoogle)
router.post('/logout', logout)

module.exports = router
