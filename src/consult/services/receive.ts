import { Either, left, right } from '@/@shared/either'
import { AlreadyExistsError } from '@/@shared/errors/already-exists-error'
import { NonExistsError } from '@/@shared/errors/non-exists-error'
import { Injectable } from '@nestjs/common'
import { Consult } from '../entities/consult'
import { ConsultRepository } from '../repositories/consult-repository'
import { QualifyConsultService } from './qualify'

export type ReceiveConsultServiceRequest = {
    id: string
    output: object
}

export type ReceiveConsultServiceResponse = Either<AlreadyExistsError, Consult>

@Injectable()
export class ReceiveConsultService {
  constructor(
    private consultRepository: ConsultRepository,
    private qualifyConsultService: QualifyConsultService
  ) {}

  async execute({
    id,
    output,
  }: ReceiveConsultServiceRequest): Promise<ReceiveConsultServiceResponse> {
    
    const consult = await this.consultRepository.findConsultById(id)

    if(!consult){
        return left(new NonExistsError(`Consult with id ${id} does not exist`))
    }

    consult.output = output

    const result = await this.consultRepository.updateConsult(id, consult)

    const qualifyResult = await this.qualifyConsultService.execute({
      consult
    })


    return right(result)
  }
}
