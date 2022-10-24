import jwt from 'jsonwebtoken'
export class jwtHelper {
  static jwtSecret: string = process.env.JWTSECRET || 'testing'

  static async createToken(payload: object) {
    const token = jwt.sign(payload, this.jwtSecret)
    return token
  }
}
