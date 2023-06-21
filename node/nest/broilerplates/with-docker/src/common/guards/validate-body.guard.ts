import { Injectable, ExecutionContext, CanActivate, BadRequestException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { validate } from 'class-validator'

class IValidateClass {}

/**
 * Guard to validate request body in cases validation must be dome before other guards
 */
@Injectable()
export class ValidateBodyGuard implements CanActivate {
  constructor(private readonly ValidateClass: typeof IValidateClass) {}

  /**
   * Method which triggers when guard is launched, decides whether to pass request or not
   * @param context ExecutionContext
   * @returns Promise<boolean>
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { body } = request
    const bodyClass = plainToClass(this.ValidateClass, body)
    const validationResult = await validate(bodyClass)
    if (validationResult && validationResult.length) {
      throw new BadRequestException(
        validationResult.map((err) => {
          const [errMsg] = Object.values(err.constraints)
          return errMsg
        }),
      )
    }
    return true
  }
}
