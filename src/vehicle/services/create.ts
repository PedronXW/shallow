import { Either, left, right } from '@/@shared/either'
import { AlreadyExistsError } from '@/@shared/errors/already-exists-error'
import { Injectable } from '@nestjs/common'
import { Vehicle } from '../entities/vehicle'
import { VehicleRepository } from '../repositories/vehicle-repository'

export type CreateVehicleServiceRequest = {
  plate: string
}

export type CreateVehicleServiceResponse = Either<AlreadyExistsError, Vehicle>

@Injectable()
export class CreateVehicleService {
  constructor(
    private vehicleRepository: VehicleRepository,
  ) {}

  async execute({
    plate,
  }: CreateVehicleServiceRequest): Promise<CreateVehicleServiceResponse> {
    const vehicleAlreadyExists = await this.vehicleRepository.findVehicleByPlate(plate)

    if (vehicleAlreadyExists) {
      return left(new AlreadyExistsError('Vehicle'))
    }

    const vehicle = Vehicle.create({
      plate
    })

    return right(await this.vehicleRepository.createVehicle(vehicle))
  }
}
