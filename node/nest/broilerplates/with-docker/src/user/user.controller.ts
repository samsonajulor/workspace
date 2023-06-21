import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common'
import { IJwtUser } from 'src/auth/interfaces/jwt-interface'
import { ApiDoc } from 'src/common/decorators/api-doc.decorator'
import { RouteDoc } from 'src/common/decorators/route-doc.decorator'
import { UserFromRequest } from 'src/common/decorators/user-from-request.decorator'
import { ChangePasswordDto, UpdateUserDto } from './dto/user.dto'
import { User } from './entity/user.entity'
import { UserService } from './user.service'

/**
 * Basic User Controller
 */
@ApiDoc({ tag: 'users' })
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Find All Users
   * @returns Promise<User[]>
   */
  @Get()
  @RouteDoc({
    operation: 'Find all users',
    ok: { type: User, isArray: true },
  })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }

  /**
   * Find User By userId
   * @param userId: string
   * @returns Promise<User>
   */
  @Get(':userId')
  @RouteDoc({
    operation: 'FInd user by id',
    notFound: true,
    ok: { type: User },
  })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string): Promise<User> {
    return await this.userService.findOne(userId)
  }

  /**
   * Update authorized user
   * @param updateUserDto: UpdateUserDto
   * @param user IJwtUser
   * @returns Promise<User>
   */
  @Patch()
  @RouteDoc({
    operation: 'Update user details',
    notFound: true,
    ok: { type: User },
  })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @UserFromRequest() user: IJwtUser,
  ): Promise<User> {
    return await this.userService.update(updateUserDto, user.id)
  }

  /**
   * Delete user
   * @param user: IJwtUser
   * @returns Promise<void>
   */
  @Delete()
  @RouteDoc({
    operation: 'Delete user',
    notFound: true,
    ok: { type: '' },
  })
  async delete(@UserFromRequest() user: IJwtUser): Promise<void> {
    return await this.userService.delete(user.id)
  }

  /**
   * Change user password
   * @param user IJwtUser
   * @param changePasswordDto ChangePasswordDto
   * @returns Promise<void>
   */
  @Post('change-password')
  @RouteDoc({
    operation: 'Change user password',
    notFound: true,
    conflict: true,
    created: { type: '' },
  })
  async changeUserPassword(
    @UserFromRequest() user: IJwtUser,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return await this.userService.changeUserPassword(user.id, changePasswordDto)
  }

  // add more routes handlers here
}
