import { Consult } from '../entities/consult';

export type FindConsultsResponse = {
  consults: Consult[];
  consultsCount: number;
};

export abstract class ConsultRepository {
  abstract createConsult(consult: Consult): Promise<Consult>;
  abstract updateConsult(id: string, consult: Partial<Consult>): Promise<Consult>;
  abstract deleteConsult(id: string): Promise<boolean>;
  abstract findConsultById(id: string): Promise<Consult | undefined>;
  abstract findAll(skip?: number, limit?: number): Promise<FindConsultsResponse>;
  abstract connectToPerson(consultId: string, personId: string): Promise<void>;
  abstract connectToVehicle(consultId: string, vehicleId: string): Promise<void>;
}