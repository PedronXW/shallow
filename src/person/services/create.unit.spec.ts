import { HashGenerator } from '@/@shared/criptography/hash-generator'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { InMemoryPersonRepository } from 'test/repositories/InMemoryPersonRepository'
import { CreatePersonService } from './create'

let sut: CreatePersonService
let inMemoryPersonRepository: InMemoryPersonRepository
let hashGenerator: HashGenerator

describe('Create Person', () => {
  beforeEach(() => {
    inMemoryPersonRepository = new InMemoryPersonRepository()
    hashGenerator = new BcryptHasher()
    sut = new CreatePersonService(inMemoryPersonRepository, hashGenerator)
  })

  it('should be able to create a new person', async () => {
    const response = await sut.execute({
      email: 'anyemail@email.com',
      password: 'any_password',
    })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryPersonRepository.persons).toHaveLength(1)
    expect(inMemoryPersonRepository.persons[0]).toEqual(response.value)
  })
})
