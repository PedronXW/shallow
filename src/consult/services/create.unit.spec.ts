import { HashGenerator } from '@/@shared/criptography/hash-generator'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { InMemoryConsultRepository } from 'test/repositories/InMemoryConsultRepository'
import { CreateConsultService } from './create'

let sut: CreateConsultService
let inMemoryConsultRepository: InMemoryConsultRepository
let hashGenerator: HashGenerator

describe('Create Consult', () => {
  beforeEach(() => {
    inMemoryConsultRepository = new InMemoryConsultRepository()
    hashGenerator = new BcryptHasher()
    sut = new CreateConsultService(inMemoryConsultRepository, hashGenerator)
  })

  it('should be able to create a new consult', async () => {
    const response = await sut.execute({
      email: 'anyemail@email.com',
      password: 'any_password',
    })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryConsultRepository.consults).toHaveLength(1)
    expect(inMemoryConsultRepository.consults[0]).toEqual(response.value)
  })
})
