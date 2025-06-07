import { VehicleFactory } from 'test/factories/unit/VehicleFactory'
import { InMemoryVehicleRepository } from 'test/repositories/InMemoryVehicleRepository'
import { NonExistsError } from '../../@shared/errors/non-exists-error'
import { FindVehicleByIdService } from './find-by-id'

let sut: FindVehicleByIdService
let inMemoryVehicleRepository: InMemoryVehicleRepository

describe('Find Vehicle By ID', () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository()
    sut = new FindVehicleByIdService(inMemoryVehicleRepository)
  })

  it('should be able to find a vehicle by id', async () => {
    const vehicle = await VehicleFactory.create({
      email: 'anyemail@email.com',
    })

    await inMemoryVehicleRepository.createVehicle(vehicle)

    const result = await sut.execute({
      id: vehicle.id.getValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryVehicleRepository.vehicles[0].id).toEqual(vehicle.id)
  })

  it('should be able to not find a vehicle because a wrong id', async () => {
    const vehicle = await VehicleFactory.create({
      email: 'anyemail@email.com',
    })

    await inMemoryVehicleRepository.createVehicle(vehicle)

    const result = await sut.execute({
      id: 'wrong id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NonExistsError)
  })
})
