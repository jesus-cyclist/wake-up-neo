const userService = require('../service/user-service')

class UserController {
  async registration(req, res, next) {
    try {
      const { name, password } = req.body
      const userData = await userService.registration(name, password)
      res.cookie(userData.refreshToken, userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      next(error) //если сюда попадает ApiError мы попадаем в middleware
    }
  }

  async login(req, res, next) {
    try {
      const { name, password } = req.body
      const userData = await userService.login(name, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json('Вы успешно вышли')
    } catch (error) {
      next(error)
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
