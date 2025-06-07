import { Either, left, right } from '@/@shared/either'
import { Injectable } from '@nestjs/common'
import { NonExistsError } from '../../@shared/errors/non-exists-error'
import { Consult } from '../entities/consult'
import { ConsultRepository } from '../repositories/consult-repository'

type FindConsultByIdServiceRequest = {
  id: string
}

type FindConsultByIdServiceResponse = Either<NonExistsError, Consult>

@Injectable()
export class FindConsultByIdService {
  constructor(private consultRepository: ConsultRepository) {}

  async execute({
    id,
  }: FindConsultByIdServiceRequest): Promise<FindConsultByIdServiceResponse> {
    const consult = await this.consultRepository.findConsultById(id)

    if (!consult) {
      return left(new NonExistsError('Consult'))
    }

    return right(consult)
  }
}
