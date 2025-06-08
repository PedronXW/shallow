import { Person } from "@/person/entities/person"
import { Vehicle } from "@/vehicle/entities/vehicle"

export const getInconsistencies = (vehicles: Vehicle[], persons: Person[]): string[] => {
    const inconsistences: string[] = []

    for (const vehicle of vehicles) {
        if(vehicle.previousOwners.length > 10){
            inconsistences.push(`Vehicle with plate ${vehicle.plate} has more than 10 previous owners.`)
        }
    }

    return inconsistences
}