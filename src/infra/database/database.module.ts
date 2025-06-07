import { UserRepository } from '@/user/repositories/user-repository';
import { Module } from '@nestjs/common';
import neo4j from 'neo4j-driver';
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
          'bolt://localhost:7687',
          neo4j.auth.basic('neo4j', 'teste123') // Substitua com suas credenciais
        );
      },
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    'NEO4J_DRIVER'
  ],
})
export class DatabaseModule {}