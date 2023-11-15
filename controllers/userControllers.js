const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')

class userControllers {
  static async register(req, res, next) {
    try {
      console.log(req.body)
      const { username, email, password, role, phoneNumber, address, profilePicture } = req.body

      const user = await User.create({ username, email, password, role, phoneNumber, address, profilePicture })
      res.status(201).json("Success creating account")
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      console.log(req.body)
      const { email, password } = req.body

      if (!email) {
        throw { name: 'EmailNull' }
      }
      if (!password) {
        throw { name: 'PasswordNull' }
      }
      const user = await User.findOne({
        where: { email }
      })
      if (!user) {
        throw { name: 'EmailInvalid' }
      }
      const validatePassword = comparePassword(password, user.password)
      if (!validatePassword) {
        throw { name: 'PasswordInvalid' }
      }
      const token = signToken({ id: user.id, email: user.email })
      res.status(200).json({ access_token: token, username: user.username, role: user.role })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userControllers