import { BcryptHelper } from '../helpers'
import { prisma } from '../prisma'

export class AuthServices {
  static async login(email: string, password: string) {
    if (!this.userExistsByEmail(email)) throw new Error('User does not exist')
    const user = await prisma.user.findFirstOrThrow({ where: { email } })
    const userHashedPassword: string = user.password
    const matched: boolean = await BcryptHelper.compare(
      password,
      userHashedPassword
    )
    if (!matched) throw new Error('Username and password do not match')
    return user
  }

  static async register(email: string, username: string, password: string) {
    if (await this.userExistsByEmail(email)) {
      throw new Error('User already exist with this email')
    }
    if (await this.userExistsByUsername(username)) {
      throw new Error('User already exist with this username')
    }
    const hashedPassword = await BcryptHelper.hash(password)
    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword }
    })
    return user
  }

  static async userExistsByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    return user != null
  }

  static async userExistsByUsername(username: string) {
    const user = await prisma.user.findUnique({ where: { username } })
    return user != null
  }
}
