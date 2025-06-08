import { EntityId } from '@/@shared/entities/entity-id';
import { Vehicle } from '@/vehicle/entities/vehicle';

export class VehicleMapper {
  static toDomain(raw: any): Vehicle {
    return Vehicle.create(
      {
        plate: raw.plate,
        owner: raw.owner,
        previousOwners: raw.previousOwners ?? [],
      },
      new EntityId(raw.id),
    );
  }

  static toPersistence(vehicle: Vehicle): Record<string, any> {
    return {
      id: vehicle.id.getValue(),
      plate: vehicle.plate,
      owner: vehicle.owner,
      previousOwners: vehicle.previousOwners,
    };
  }
}