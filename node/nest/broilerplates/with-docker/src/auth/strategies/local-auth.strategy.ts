import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, NotFoundException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { User } from 'src/user/entity/user.entity'

/**
 * Passport Local Strategy
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' })
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new NotFoundException('User with provided email not found')
    }
    return user
  }
}
