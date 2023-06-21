import { ApiResponseProperty } from '@nestjs/swagger'

/**
 * Auth response with jwt
 */
export class AuthResponse {
  @ApiResponseProperty()
  jwt: string
}
