import { Vehicle } from '../entities/vehicle';

export type FindVehiclesResponse = {
  vehicles: Vehicle[];
  vehiclesCount: number;
};

export abstract class VehicleRepository {
  abstract createVehicle(vehicle: Vehicle): Promise<Vehicle>;
  abstract updateVehicle(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle>;
  abstract deleteVehicle(id: string): Promise<boolean>;
  abstract findVehicleById(id: string): Promise<Vehicle | undefined>;
  abstract findVehicleByPlate(plate: string): Promise<Vehicle | undefined>;
  abstract findAll(skip?: number, limit?: number): Promise<FindVehiclesResponse>;
  abstract connectToPerson(vehicleId: string, personId: string, type: string): Promise<void>;
  abstract connectToConsult(vehicleId: string, consultId: string, type: string): Promise<void>;
}