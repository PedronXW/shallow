import { Either, left, right } from '@/@shared/either'
import { Injectable } from '@nestjs/common'
import { NonExistsError } from '../../@shared/errors/non-exists-error'
import { Vehicle } from '../entities/vehicle'
import { VehicleRepository } from '../repositories/vehicle-repository'

type FindVehicleByPlateServiceRequest = {
  plate: string
}

type FindVehicleByPlateServiceResponse = Either<NonExistsError, Vehicle>

@Injectable()
export class FindVehicleByPlateService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute({
    plate
  }: FindVehicleByPlateServiceRequest): Promise<FindVehicleByPlateServiceResponse> {
    const vehicle = await this.vehicleRepository.findVehicleByPlate(plate)

    if (!vehicle) {
      return left(new NonExistsError('Vehicle'))
    }

    return right(vehicle)
  }
}
