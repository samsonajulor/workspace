import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PasswordService } from 'src/common/services/password.service'
import { User } from './entity/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

/**
 * User module
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
