import { ConsultRepository } from '@/consult/repositories/consult-repository';
import { PersonRepository } from '@/person/repositories/person-repository';
import { UserRepository } from '@/user/repositories/user-repository';
import { VehicleRepository } from '@/vehicle/repositories/vehicle-repository';
import { Module } from '@nestjs/common';
import neo4j from 'neo4j-driver';
import { Neo4jConsultRepository } from './neo4j/repositories/consult-repository';
import { Neo4jPersonRepository } from './neo4j/repositories/person-repository';
import { Neo4jVehicleRepository } from './neo4j/repositories/vehicle-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: 'NEO4J_DRIVER',
      useFactory: () => {
        return neo4j.driver(
          'bolt://neo4j:7687', // nome do serviço no docker-compose
          neo4j.auth.basic('neo4j', 'teste123')
        );
      },
    },
    {
      provide: PersonRepository,
      useClass: Neo4jPersonRepository,
    },
    {
      provide: VehicleRepository,
      useClass: Neo4jVehicleRepository,
    },
    {
      provide: ConsultRepository,
      useClass: Neo4jConsultRepository
    }
  ],
  exports: [
    PrismaService,
    UserRepository,
    'NEO4J_DRIVER',
    PersonRepository,
    VehicleRepository,
    ConsultRepository,
  ],
})
export class DatabaseModule {}