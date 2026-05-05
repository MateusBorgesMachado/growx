import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user.repository'

export class AuthService {
  private userRepository = new UserRepository()

  public async login(email: string, PurePassword: string) {
    const user = await this.userRepository.getByEmail(email)

    if (!user[0]) {
      throw new Error('Invalid credentials')
    }

    const CorrectPassword = await bcrypt.compare(PurePassword, user[0].password)

    if (!CorrectPassword) {
      throw new Error('Invalid credentials')
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('Server configuration error')
    }

    const token = jwt.sign(
      { id: user[0].id }, 
      secret,          
      { expiresIn: '1d' } 
    )

    return token
  }
}