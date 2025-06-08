import { Consult } from '@/consult/entities/consult';
import { ConsultRepository, FindConsultsResponse } from '@/consult/repositories/consult-repository';
import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { ConsultMapper } from '../mappers/consult-mapper';

@Injectable()
export class Neo4jConsultRepository extends ConsultRepository {
  constructor(@Inject('NEO4J_DRIVER') private readonly driver: Driver) {
    super();
  }

  private getSession() {
    return this.driver.session();
  }

  async createConsult(consult: Consult): Promise<Consult> {
    const session = this.getSession();
    const props = ConsultMapper.toPersistence(consult);

    try {
      await session.run(`CREATE (c:Consult $props)`, { props });
      return consult;
    } finally {
      await session.close();
    }
  }

  async updateConsult(id: string, updates: Consult): Promise<Consult> {
    const session = this.getSession();
    
    const updateEntries = Object.entries(ConsultMapper.toPersistence(updates))
      .map(([key, value]) => `c.${key} = $${key}`)
      .join(', ');

    const updateParams = Object.fromEntries(
      Object.entries(ConsultMapper.toPersistence(updates)).map(([key, value]) => [`${key}`, value])
    );

    try {
      await session.run(
        `MATCH (c:Consult {id: $id}) SET ${updateEntries}`,
        { id, ...updateParams }
      );
      const updated = await this.findConsultById(id);
      if (!updated) throw new Error('Consult not found after update');
      return updated;
    } finally {
      await session.close();
    }
  }

  async deleteConsult(id: string): Promise<boolean> {
    const session = this.getSession();
    try {
      await session.run(`MATCH (c:Consult {id: $id}) DETACH DELETE c`, { id });
      return true;
    } finally {
      await session.close();
    }
  }

  async findConsultById(id: string): Promise<Consult | undefined> {
    const session = this.getSession();
    try {
      const result = await session.run(
        `MATCH (c:Consult {id: $id}) RETURN c`,
        { id }
      );
      const record = result.records[0];
      if (!record) return undefined;

      const raw = record.get('c').properties;
      return ConsultMapper.toDomain(raw);
    } finally {
      await session.close();
    }
  }

  async findAll(skip = 0, limit = 10): Promise<FindConsultsResponse> {
    const session = this.getSession();
    try {
      const result = await session.run(
        `MATCH (c:Consult) RETURN c SKIP $skip LIMIT $limit`,
        { skip, limit }
      );

      const countResult = await session.run(
        `MATCH (c:Consult) RETURN count(c) AS total`
      );

      const consults = result.records.map((r) =>
        ConsultMapper.toDomain(r.get('c').properties)
      );
      const consultsCount = countResult.records[0].get('total').toInt();

      return { consults, consultsCount };
    } finally {
      await session.close();
    }
  }

  async connectToPerson(consultId: string, personId: string): Promise<void> {
    const session = this.getSession();
    try {
      await session.run(
        `
        MATCH (c:Consult {id: $consultId}), (p:Person {id: $personId})
        MERGE (c)-[:INVOLVES]->(p)
        `,
        { consultId, personId }
      );
    } finally {
      await session.close();
    }
  }

  async connectToVehicle(consultId: string, vehicleId: string): Promise<void> {
    const session = this.getSession();
    try {
      await session.run(
        `
        MATCH (c:Consult {id: $consultId}), (v:Vehicle {id: $vehicleId})
        MERGE (c)-[:ANALYZES]->(v)
        `,
        { consultId, vehicleId }
      );
    } finally {
      await session.close();
    }
  }
}