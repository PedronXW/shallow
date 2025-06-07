import { Person } from '@/person/entities/person';
import { FindPersonsResponse, PersonRepository } from '@/person/repositories/person-repository';
import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { PersonMapper } from '../mappers/person-mapper';


@Injectable()
export class Neo4jPersonRepository extends PersonRepository {
  constructor(@Inject('NEO4J_DRIVER') private readonly driver: Driver) {
    super();
  }

  private getSession() {
    return this.driver.session();
  }

  async createPerson(person: Person): Promise<Person> {
    const session = this.getSession();
    const props = PersonMapper.toPersistence(person);

    try {
      await session.run(
        `CREATE (p:Person $props)`,
        { props }
      );
      return person;
    } finally {
      await session.close();
    }
  }

  async updatePerson(id: string, updates: Partial<Person>): Promise<Person> {
    const session = this.getSession();
    const updateEntries = Object.entries(updates).map(([k]) => `p.${k} = $${k}`).join(', ');

    const updateParams = Object.fromEntries(
      Object.entries(updates).map(([k, v]) => [k, (v as any)])
    );

    try {
      await session.run(
        `MATCH (p:Person {id: $id}) SET ${updateEntries}`,
        { id, ...updateParams }
      );
      const updated = await this.findPersonById(id);
      if (!updated) throw new Error('Person not found after update');
      return updated;
    } finally {
      await session.close();
    }
  }

  async deletePerson(id: string): Promise<boolean> {
    const session = this.getSession();
    try {
      await session.run(
        `MATCH (p:Person {id: $id}) DETACH DELETE p`,
        { id }
      );
      return true;
    } finally {
      await session.close();
    }
  }

  async findPersonById(id: string): Promise<Person | undefined> {
    const session = this.getSession();
    try {
      const result = await session.run(
        `MATCH (p:Person {id: $id}) RETURN p`,
        { id }
      );
      const record = result.records[0];
      if (!record) return undefined;

      const raw = record.get('p').properties;
      return PersonMapper.toDomain(raw);
    } finally {
      await session.close();
    }
  }

  async findPersonByIdentification(identification: string): Promise<Person | undefined> {
    const session = this.getSession();
    try {
      const result = await session.run(
        `MATCH (p:Person {identification: $identification}) RETURN p`,
        { identification }
      );
      const record = result.records[0];
      if (!record) return undefined;

      const raw = record.get('p').properties;
      return PersonMapper.toDomain(raw);
    } finally {
      await session.close();
    }
  }

  async findAll(skip = 0, limit = 10): Promise<FindPersonsResponse> {
    const session = this.getSession();
    try {
      const result = await session.run(
        `MATCH (p:Person) RETURN p SKIP $skip LIMIT $limit`,
        { skip, limit }
      );

      const countResult = await session.run(
        `MATCH (p:Person) RETURN count(p) AS total`
      );

      const persons = result.records.map((r) =>
        PersonMapper.toDomain(r.get('p').properties)
      );
      const personsCount = countResult.records[0].get('total').toInt();

      return { persons, personsCount };
    } finally {
      await session.close();
    }
  }

  async connectToVehicle(personId: string, vehicleId: string): Promise<void> {
    const session = this.getSession();
    try {
      await session.run(
        `
        MATCH (p:Person {id: $personId}), (v:Vehicle {id: $vehicleId})
        MERGE (p)-[:OWNS]->(v)
        `,
        { personId, vehicleId }
      );
    } finally {
      await session.close();
    }
  }

  async connectToConsult(personId: string, consultId: string): Promise<void> {
    const session = this.getSession();
    try {
      await session.run(
        `
        MATCH (p:Person {id: $personId}), (c:Consult {id: $consultId})
        MERGE (p)-[:PARTICIPATED_IN]->(c)
        `,
        { personId, consultId }
      );
    } finally {
      await session.close();
    }
  }
}