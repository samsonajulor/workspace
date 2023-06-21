import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigModule } from './config/config.module'
import { CommonModule } from './common/common.module'
import { AuthModule } from './auth/auth.module'

/**
 * Main app module
 */
@Module({
  imports: [
    ConfigModule,
    UserModule,
    CommonModule,
    AuthModule,
    // load all other modules here
  ],
})
export class AppModule {}
