import { Person } from "@/person/entities/person"
import { Vehicle } from "@/vehicle/entities/vehicle"
import { PropertyType } from "./types/Property"

export const qualifyByOutput = (type: string, output: object) => {

    const vehicles: Vehicle[] = []
    const persons: Person[] = []

    if(type === 'PROPERTY'){

        const outputData = output as {data: Array<PropertyType>, files: Array<unknown>}

        const typedOutput = outputData.data[0]

        if(!typedOutput){
            console.error('qualifyByOutput no data found in output')
            return { vehicles, persons }
        }

        if(typedOutput.carDetails){
            const vehicle = Vehicle.create({
                plate: typedOutput.carDetails.plate
            })

            if(typedOutput.previousOwners && typedOutput.previousOwners.length > 0){

                console.log('qualifyByOutput previousOwners', typedOutput.previousOwners)
                typedOutput.previousOwners.forEach(owner => {
                    const person = Person.create({
                        identification: owner.document
                    })
                    persons.push(person)
                    vehicle.previousOwners.push(person.id.getValue())
                    vehicles.push(vehicle)
                })
            }
        }
    }

    return {
        vehicles,
        persons
    }
}