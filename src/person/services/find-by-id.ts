import { Either, left, right } from '@/@shared/either'
import { Injectable } from '@nestjs/common'
import { NonExistsError } from '../../@shared/errors/non-exists-error'
import { Person } from '../entities/person'
import { PersonRepository } from '../repositories/person-repository'

type FindPersonByIdServiceRequest = {
  id: string
}

type FindPersonByIdServiceResponse = Either<NonExistsError, Person>

@Injectable()
export class FindPersonByIdService {
  constructor(private personRepository: PersonRepository) {}

  async execute({
    id,
  }: FindPersonByIdServiceRequest): Promise<FindPersonByIdServiceResponse> {
    const person = await this.personRepository.findPersonById(id)

    if (!person) {
      return left(new NonExistsError('Person'))
    }

    return right(person)
  }
}
