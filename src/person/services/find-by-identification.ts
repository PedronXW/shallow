import { Either, left, right } from '@/@shared/either'
import { Injectable } from '@nestjs/common'
import { NonExistsError } from '../../@shared/errors/non-exists-error'
import { Person } from '../entities/person'
import { PersonRepository } from '../repositories/person-repository'

type FindPersonByIdentificationServiceRequest = {
  identification: string
}

type FindPersonByIdentificationServiceResponse = Either<NonExistsError, Person>

@Injectable()
export class FindPersonByIdentificationService {
  constructor(private personRepository: PersonRepository) {}

  async execute({
    identification
  }: FindPersonByIdentificationServiceRequest): Promise<FindPersonByIdentificationServiceResponse> {
    const person = await this.personRepository.findPersonByIdentification(identification)

    if (!person) {
      return left(new NonExistsError('Person'))
    }

    return right(person)
  }
}
