import { PersonFactory } from 'test/factories/unit/PersonFactory'
import { InMemoryPersonRepository } from 'test/repositories/InMemoryPersonRepository'
import { NonExistsError } from '../../@shared/errors/non-exists-error'
import { FindPersonByIdService } from './find-by-id'

let sut: FindPersonByIdService
let inMemoryPersonRepository: InMemoryPersonRepository

describe('Find Person By ID', () => {
  beforeEach(() => {
    inMemoryPersonRepository = new InMemoryPersonRepository()
    sut = new FindPersonByIdService(inMemoryPersonRepository)
  })

  it('should be able to find a person by id', async () => {
    const person = await PersonFactory.create({
      email: 'anyemail@email.com',
    })

    await inMemoryPersonRepository.createPerson(person)

    const result = await sut.execute({
      id: person.id.getValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPersonRepository.persons[0].id).toEqual(person.id)
  })

  it('should be able to not find a person because a wrong id', async () => {
    const person = await PersonFactory.create({
      email: 'anyemail@email.com',
    })

    await inMemoryPersonRepository.createPerson(person)

    const result = await sut.execute({
      id: 'wrong id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NonExistsError)
  })
})
