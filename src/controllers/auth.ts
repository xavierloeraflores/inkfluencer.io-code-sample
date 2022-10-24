import { NextFunction, Request, Response } from 'express'
import { AuthServices } from '../services'
import { JwtHeader } from 'jsonwebtoken'
import { jwtHelper } from '../helpers/jwt'
const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'hello from auth router' })
}
interface loginCredentials {
  email: string
  password: string
}
interface registerCredentials extends loginCredentials {
  username: string
}
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials: loginCredentials = req.body.credentials
    if (!credentials || !credentials.email || !credentials.password)
      throw new Error('Invalid request: Missing Required Credentials')
    const userData = await AuthServices.login(
      credentials.email,
      credentials.password
    )
    const user = { email: userData.email, username: userData.username }
    const token = await jwtHelper.createToken({ user })
    return res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials: registerCredentials = req.body.credentials
    if (
      !credentials ||
      !credentials.email ||
      !credentials.password ||
      !credentials.username
    )
      throw new Error('Invalid request: Missing Required Credentials')

    const userData = await AuthServices.register(
      credentials.email,
      credentials.username,
      credentials.password
    )
    const user = { email: userData.email, username: userData.username }
    const token = await jwtHelper.createToken({ user })
    return res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  healthCheck,
  login,
  register
}
