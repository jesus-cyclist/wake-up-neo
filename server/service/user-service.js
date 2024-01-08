const UserModel = require('../models/user-model')
const tokenService = require('./token-service')
const TokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const bcrypt = require('bcrypt')
const TokenModel = require('../models/token-model')

class UserService {
  async registration(name, password) {
    const isUserUnique = await UserModel.findOne({ name })
    if (isUserUnique) {
      throw ApiError.BadRequest(`Пользователь с именем ${name} уже существует`)
    }

    const hashPasword = await bcrypt.hash(password, 3)
    const user = await UserModel.create({ name, password: hashPasword })
    const userDto = new UserDto(user) //id
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async login(name, password) {
    const user = await UserModel.findOne({ name })
    if (!user) {
      throw ApiError.BadRequest(`Пользователя с именем ${name} не существует`)
    }

    const isPassEqual = await bcrypt.compare(password, user.password)
    if (!isPassEqual) {
      throw ApiError.BadRequest(`Неверный пароль`)
    }
    const userDto = new UserDto(user) //id

    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user) //id
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAllUsers() {
    const users = await UserModel.find({})
    return users
  }
}

module.exports = new UserService()
