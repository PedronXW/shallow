import { HashGenerator } from '@/@shared/criptography/hash-generator'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { InMemoryVehicleRepository } from 'test/repositories/InMemoryVehicleRepository'
import { CreateVehicleService } from './create'

let sut: CreateVehicleService
let inMemoryVehicleRepository: InMemoryVehicleRepository
let hashGenerator: HashGenerator

describe('Create Vehicle', () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository()
    hashGenerator = new BcryptHasher()
    sut = new CreateVehicleService(inMemoryVehicleRepository, hashGenerator)
  })

  it('should be able to create a new vehicle', async () => {
    const response = await sut.execute({
      email: 'anyemail@email.com',
      password: 'any_password',
    })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryVehicleRepository.vehicles).toHaveLength(1)
    expect(inMemoryVehicleRepository.vehicles[0]).toEqual(response.value)
  })
})
