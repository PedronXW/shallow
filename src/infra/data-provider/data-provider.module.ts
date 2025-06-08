import { DataRepository } from '@/consult/repositories/data-repository';
import { Module } from '@nestjs/common';
import { PowertrainRepository } from './powertrain/powertrain-repository';

@Module({
  imports: [],
  providers: [{
    provide: DataRepository,
    useClass: PowertrainRepository
  }],
  exports: [DataRepository],
})
export class DataProviderModule {}
