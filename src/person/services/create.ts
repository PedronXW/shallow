import { Either, left, right } from '@/@shared/either'
import { AlreadyExistsError } from '@/@shared/errors/already-exists-error'
import { Injectable } from '@nestjs/common'
import { Person } from '../entities/person'
import { PersonRepository } from '../repositories/person-repository'

export type CreatePersonServiceRequest = {
  identification: string
}

export type CreatePersonServiceResponse = Either<AlreadyExistsError, Person>

@Injectable()
export class CreatePersonService {
  constructor(
    private personRepository: PersonRepository,
  ) {}

  async execute({
    identification
  }: CreatePersonServiceRequest): Promise<CreatePersonServiceResponse> {
    const personAlreadyExists = await this.personRepository.findPersonByIdentification(identification)

    if (personAlreadyExists) {
      return left(new AlreadyExistsError('Person'))
    }

    const person = Person.create({
      identification
    })

    return right(await this.personRepository.createPerson(person))
  }
}
