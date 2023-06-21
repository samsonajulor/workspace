import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PasswordService } from 'src/common/services/password.service'
import { CreateUserDto } from 'src/user/dto/user.dto'
import { User } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'
import { AuthResponse } from './dto/auth-response'

/**
 * Auth Service
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user when signin
   * @param email: string
   * @param pass: string
   * @returns Promise<User | null>
   */
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email)
    if (!user) return null
    const isPasswordMatch = await this.passwordService.comparePassword(user.password, pass)
    return isPasswordMatch ? user : null
  }

  /**
   * Signup new user
   * @param createUserDto: CreateUserDto
   * @returns Promise<AuthResponse>
   */
  async signup(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.userService.create(createUserDto)
    return this._createAuthResponse(user)
  }

  /**
   * Sign in existing user
   * @param user User
   * @returns AuthResponse
   */
  signin(user: User): AuthResponse {
    return this._createAuthResponse(user)
  }

  /**
   * Helper private method to create jwt
   * @param user: User
   * @returns AuthResponse
   */
  private _createAuthResponse(user: User): AuthResponse {
    const { id, email } = user
    return {
      jwt: this.jwtService.sign({ id, email }),
    }
  }
}
