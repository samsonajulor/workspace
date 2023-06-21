/**
 * Jwt encoded user interface
 */
export interface IJwtUser {
  id: string
  email: string
}

/**
 * Jwt payload interface
 */
export interface IJwtPayload extends IJwtUser {
  iat: number
  exp: number
}
