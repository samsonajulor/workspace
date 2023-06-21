import { Injectable, NotFoundException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * Local Auth Guard
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super()
  }

  handleRequest(err, user) {
    // throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new NotFoundException('User not found')
    }
    return user
  }
}
