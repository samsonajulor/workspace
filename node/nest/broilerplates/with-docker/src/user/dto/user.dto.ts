import { PartialType } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'
/**
 * Basic User DTO
 */
class BasicUserDto {
  @IsEmail()
  email: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}

/**
 * Create User DTO
 * @extends BasicUserDto
 */
export class CreateUserDto extends BasicUserDto {
  @IsString()
  @MinLength(6)
  password: string
}

/**
 * Update User DTO
 * @extends BasicUserDto: all props marked as optional
 */
export class UpdateUserDto extends PartialType(BasicUserDto) {}

/**
 * Change user password DTO
 */
export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  password: string
}
