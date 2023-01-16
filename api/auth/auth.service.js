const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

async function login(username, password) {
  logger.debug(`auth.service - login with username: ${username}`)

  const user = await userService.getByUsername(username)
  if (!user) return Promise.reject('Invalid username or password')
  // TODO: un-comment for real login
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Invalid username or password')

  delete user.password
  user._id = user._id.toString()
  return user
}

async function loginViaGoogle(username) {
  logger.debug(`auth.service - login with username: ${username}`)

  const user = await userService.getByUsername(username)
  if (!user) return Promise.reject('Invalid username')
  user._id = user._id.toString()
  return user
}

// (async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()

async function signup(user) {
  const saltRounds = 10
  logger.debug(`auth.service - signup with username: ${user.username}`)
  // if (!user.username || !user.password || !user.fullname)
  if (!user.username || !user.password)
    return Promise.reject('Missing required signup information')

  const userExist = await userService.getByUsername(user.username)
  if (userExist) return Promise.reject('Username already taken')

  const hash = await bcrypt.hash(user.password, saltRounds)
  return userService.add({ ...user, password: hash })
}

async function signupViaGoogle(user) {
//   const saltRounds = 10
  logger.debug(`auth.service - signup with username: ${user.username}`)
  // if (!user.username || !user.password || !user.fullname)
  if (!user.username)
    return Promise.reject('Missing required signup information')

  const userExist = await userService.getByUsername(user.username)
  if (userExist) return Promise.reject('Username already taken')

//   const hash = await bcrypt.hash(user.password, saltRounds)
  return userService.add({ ...user })
}

function getLoginToken(user) {
  return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
  try {
    const json = cryptr.decrypt(loginToken)
    const loggedinUser = JSON.parse(json)
    return loggedinUser
  } catch (err) {
    console.log('Invalid login token')
  }
  return null
}

module.exports = {
  signup,
  signupViaGoogle,
  login,
  loginViaGoogle,
  getLoginToken,
  validateToken,
}
