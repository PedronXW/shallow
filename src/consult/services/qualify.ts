import { Either, left, right } from '@/@shared/either'
import { AlreadyExistsError } from '@/@shared/errors/already-exists-error'
import { InternalServerError } from '@/@shared/errors/internal-server-error'
import { PersonRepository } from '@/person/repositories/person-repository'
import { VehicleRepository } from '@/vehicle/repositories/vehicle-repository'
import { Injectable } from '@nestjs/common'
import { Consult } from '../entities/consult'
import { ConsultRepository } from '../repositories/consult-repository'
import { getInconsistencies } from '../utils/getInconsistencies'
import { qualifyByOutput } from '../utils/qualifyByOutput'

export type QualifyConsultServiceRequest = {
    consult: Consult
}

export type QualifyConsultServiceResponse = Either<AlreadyExistsError, Consult>

@Injectable()
export class QualifyConsultService {
  constructor(
    private consultRepository: ConsultRepository,
    private personRepository: PersonRepository,
    private vehicleRepository: VehicleRepository
  ) {}

  async execute({
    consult
  }: QualifyConsultServiceRequest): Promise<QualifyConsultServiceResponse> {


    if(!consult.output){
      return left(new InternalServerError(`Consult with id ${consult.id} does not have output to qualify`))
    }

    const {persons, vehicles} = qualifyByOutput(consult.type, consult.output)

    for (const person of persons) {
      let existingPerson = await this.personRepository.findPersonByIdentification(person.identification)

      if (!existingPerson) {
        const createdPerson = await this.personRepository.createPerson(person)
        existingPerson = createdPerson
      }

      await this.personRepository.connectToConsult(existingPerson.id.getValue(), consult.id.getValue(), 'FOUNDED_BY')
    }

    for (const vehicle of vehicles) {
      let existingVehicle = await this.vehicleRepository.findVehicleByPlate(vehicle.plate)

      if (!existingVehicle) {
        const createdVehicle = await this.vehicleRepository.createVehicle(vehicle)
        existingVehicle = createdVehicle
      }

      await this.vehicleRepository.connectToConsult(existingVehicle.id.getValue(), consult.id.getValue(), 'FOUNDED_BY')

      for( const person of vehicle.previousOwners) {
          await this.vehicleRepository.connectToPerson(existingVehicle.id.getValue(), person, 'PREVIOUS_OWNER')
      }
    }

    const inconsistences = getInconsistencies(vehicles, persons)

    console.log('Inconsistencies found:')
    for (const inconsistency of inconsistences) {
      console.log(inconsistency)
    }

    return right(await this.consultRepository.updateConsult(consult.id.getValue(), consult))
  }
}
