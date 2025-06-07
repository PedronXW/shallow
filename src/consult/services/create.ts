import { Either, right } from '@/@shared/either'
import { AlreadyExistsError } from '@/@shared/errors/already-exists-error'
import { Injectable } from '@nestjs/common'
import { Consult } from '../entities/consult'
import { ConsultRepository } from '../repositories/consult-repository'

export type CreateConsultServiceRequest = {
  input:object
  type: string
}

export type CreateConsultServiceResponse = Either<AlreadyExistsError, Consult>

@Injectable()
export class CreateConsultService {
  constructor(
    private consultRepository: ConsultRepository,
  ) {}

  async execute({
    input,
    type,
  }: CreateConsultServiceRequest): Promise<CreateConsultServiceResponse> {
    const consult = Consult.create({
      input,
      type,
    })

    return right(await this.consultRepository.createConsult(consult))
  }
}
