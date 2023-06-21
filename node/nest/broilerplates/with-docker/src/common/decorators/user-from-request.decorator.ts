import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IJwtUser } from 'src/auth/interfaces/jwt-interface'

/**
 * Decorator to extract authed user from request
 */
export const UserFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtUser => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
