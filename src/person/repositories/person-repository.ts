import { Person } from '../entities/person';

export type FindPersonsResponse = {
  persons: Person[];
  personsCount: number;
};

export abstract class PersonRepository {
  abstract createPerson(person: Person): Promise<Person>;
  abstract updatePerson(id: string, person: Partial<Person>): Promise<Person>;
  abstract deletePerson(id: string): Promise<boolean>;
  abstract findPersonById(id: string): Promise<Person | undefined>;
  abstract findPersonByIdentification(plate: string): Promise<Person | undefined>;
  abstract findAll(skip?: number, limit?: number): Promise<FindPersonsResponse>;
  abstract connectToVehicle(personId: string, vehicleId: string, type: string): Promise<void>;
  abstract connectToConsult(personId: string, consultId: string, type: string): Promise<void>;
}