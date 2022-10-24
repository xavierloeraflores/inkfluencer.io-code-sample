const bcrypt = require('bcrypt')

export class BcryptHelper {
  static saltRounds: number = 8

  static async hash(password: string) {
    const hashedPassword: string = await bcrypt.hash(password, this.saltRounds)
    return hashedPassword
  }
  static async compare(password: string, hashedPassword: string) {
    const compare: boolean = await bcrypt.compare(password, hashedPassword)
    return compare
  }
}
