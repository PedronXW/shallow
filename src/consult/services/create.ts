import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { AlreadyExistsError } from '@/@shared/errors/already-exists-error'
import { InternalServerError } from '@/@shared/errors/internal-server-error'
import { Injectable } from '@nestjs/common'
import { Consult } from '../entities/consult'
import { ConsultRepository } from '../repositories/consult-repository'
import { DataRepository } from '../repositories/data-repository'

export type CreateConsultServiceRequest = {
  input:object
  type: string
}

export type CreateConsultServiceResponse = Either<AlreadyExistsError, Consult>

@Injectable()
export class CreateConsultService {
  constructor(
    private consultRepository: ConsultRepository,
    private dataRepository: DataRepository,
  ) {}

  async execute({
    input,
    type,
  }: CreateConsultServiceRequest): Promise<CreateConsultServiceResponse> {

    const result = await this.dataRepository.createDataRequest(type, input)

    if (!result) {
      return left(new InternalServerError(`Failed to create data request for type ${type}`))
    }

    await this.dataRepository.dispatchDataRequest(result.id)

    const consult = Consult.create({
      input,
      type,
    }, new EntityId(result.id))

    return right(await this.consultRepository.createConsult(consult))
  }
}
