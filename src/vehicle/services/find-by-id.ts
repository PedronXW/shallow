import { Either, left, right } from '@/@shared/either'
import { Injectable } from '@nestjs/common'
import { NonExistsError } from '../../@shared/errors/non-exists-error'
import { Vehicle } from '../entities/vehicle'
import { VehicleRepository } from '../repositories/vehicle-repository'

type FindVehicleByIdServiceRequest = {
  id: string
}

type FindVehicleByIdServiceResponse = Either<NonExistsError, Vehicle>

@Injectable()
export class FindVehicleByIdService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute({
    id,
  }: FindVehicleByIdServiceRequest): Promise<FindVehicleByIdServiceResponse> {
    const vehicle = await this.vehicleRepository.findVehicleById(id)

    if (!vehicle) {
      return left(new NonExistsError('Vehicle'))
    }

    return right(vehicle)
  }
}
