import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common'
import { ApiDoc } from 'src/common/decorators/api-doc.decorator'
import { CreateUserDto } from 'src/user/dto/user.dto'
import { AuthService } from './auth.service'
import { AuthResponse } from './dto/auth-response'
import { SigninUserDto } from './dto/signin-user.dto'
import { PublicRoute } from '../common/decorators/public-route.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { ValidateBodyGuard } from 'src/common/guards/validate-body.guard'
import { RouteDoc } from 'src/common/decorators/route-doc.decorator'

/**
 * Auth Controller
 */
@ApiDoc({ tag: 'auth', isPublic: true })
@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Signin existing user
   * @param signinUserDto: SigninUserDto
   * @param req: Request
   * @returns AuthResponse
   */
  @UseGuards(new ValidateBodyGuard(SigninUserDto), LocalAuthGuard)
  @Post('signin')
  @RouteDoc({
    operation: 'Sign in existing user',
    notFound: true,
    created: { type: AuthResponse },
  })
  signin(@Body() signinUserDto: SigninUserDto, @Request() req): AuthResponse {
    return this.authService.signin(req.user)
  }

  /**
   * Signup new user
   * @param createUserDto: CreateUserDto
   * @returns Promise<AuthResponse>
   */
  @Post('signup')
  @RouteDoc({
    operation: 'Sign up new user',
    conflict: true,
    created: { type: AuthResponse },
  })
  async signup(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    return await this.authService.signup(createUserDto)
  }
}
