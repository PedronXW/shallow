import { CreateConsultService } from '@/consult/services/create'
import { FindConsultByIdService } from '@/consult/services/find-by-id'
import { QualifyConsultService } from '@/consult/services/qualify'
import { ReceiveConsultService } from '@/consult/services/receive'
import { EnvModule } from '@/infra/env/env.module'
import { CreatePersonService } from '@/person/services/create'
import { FindPersonByIdService } from '@/person/services/find-by-id'
import { FindPersonByIdentificationService } from '@/person/services/find-by-identification'
import { AuthenticateUserService } from '@/user/services/authenticate'
import { ChangePasswordService } from '@/user/services/change-password'
import { CreateUserService } from '@/user/services/create'
import { DeleteUserService } from '@/user/services/delete'
import { FindUserByIdService } from '@/user/services/find-by-id'
import { CreateVehicleService } from '@/vehicle/services/create'
import { FindVehicleByIdService } from '@/vehicle/services/find-by-id'
import { FindVehicleByPlateService } from '@/vehicle/services/find-by-plate'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptograpy.module'
import { DataProviderModule } from '../data-provider/data-provider.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateUserController } from './controllers/authentication/authenticate-user-controller'
import { CreateConsultController } from './controllers/consult/consult.controller'
import { HealthController } from './controllers/health/health.controller'
import { ChangePasswordController } from './controllers/user/change-password/change-password'
import { CreateUserController } from './controllers/user/create/create'
import { DeleteUserController } from './controllers/user/delete/delete'

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule, DataProviderModule],
  controllers: [
    AuthenticateUserController,
    ChangePasswordController,
    CreateUserController,
    DeleteUserController,
    HealthController,
    CreateConsultController
  ],
  providers: [
    AuthenticateUserService,
    ChangePasswordService,
    CreateUserService,
    DeleteUserService,
    FindUserByIdService,
    CreateConsultService,
    FindConsultByIdService,
    CreateVehicleService,
    FindVehicleByIdService,
    FindVehicleByPlateService,
    CreatePersonService,
    FindPersonByIdService,
    FindPersonByIdentificationService,
    ReceiveConsultService,
    QualifyConsultService
  ],
})
export class HttpModule {}
