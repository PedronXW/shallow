import { EnvModule } from '@/infra/env/env.module'
import { AuthenticateUserService } from '@/user/services/authenticate'
import { ChangePasswordService } from '@/user/services/change-password'
import { CreateUserService } from '@/user/services/create'
import { DeleteUserService } from '@/user/services/delete'
import { FindUserByIdService } from '@/user/services/find-by-id'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptograpy.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateUserController } from './controllers/authentication/authenticate-user-controller'
import { HealthController } from './controllers/health/health.controller'
import { ChangePasswordController } from './controllers/user/change-password/change-password'
import { CreateUserController } from './controllers/user/create/create'
import { DeleteUserController } from './controllers/user/delete/delete'

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  controllers: [
    AuthenticateUserController,
    ChangePasswordController,
    CreateUserController,
    DeleteUserController,
    HealthController,
  ],
  providers: [
    AuthenticateUserService,
    ChangePasswordService,
    CreateUserService,
    DeleteUserService,
    FindUserByIdService,
  ],
})
export class HttpModule {}
