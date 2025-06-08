import { Vehicle } from "@/vehicle/entities/vehicle";
import { FindVehiclesResponse, VehicleRepository } from "@/vehicle/repositories/vehicle-repository";
import { Inject, Injectable } from "@nestjs/common";
import { Driver } from "neo4j-driver";
import { VehicleMapper } from "../mappers/vehicle-mapper";

@Injectable()
export class Neo4jVehicleRepository extends VehicleRepository {
  constructor(@Inject('NEO4J_DRIVER') private readonly driver: Driver) {
    super();
  }

  private getSession() {
    return this.driver.session();
  }

  async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
    const session = this.getSession();
    const props = VehicleMapper.toPersistence(vehicle);

    try {
      await session.run(
        `CREATE (v:Vehicle $props)`,
        { props }
      );
      return vehicle;
    } finally {
      await session.close();
    }
  }

  async updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const session = this.getSession();
    const updates = Object.entries(data)
      .map(([key]) => `v.${key} = $${key}`)
      .join(', ');

    const params = { id, ...Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, (v as any)])
    ) };

    try {
      await session.run(
        `MATCH (v:Vehicle {id: $id}) SET ${updates}`,
        params
      );
      const updated = await this.findVehicleById(id);
      if (!updated) throw new Error('Vehicle not found');
      return updated;
    } finally {
      await session.close();
    }
  }

  async changePassword(id: string, password: string): Promise<Vehicle> {
    // ignorar caso sua entidade não use senha
    throw new Error('Method not implemented: changePassword');
  }

  async deleteVehicle(id: string): Promise<boolean> {
    const session = this.getSession();
    try {
      await session.run(
        `MATCH (v:Vehicle {id: $id}) DETACH DELETE v`,
        { id }
      );
      return true;
    } finally {
      await session.close();
    }
  }

  async findVehicleById(id: string): Promise<Vehicle | undefined> {
    const session = this.getSession();
    try {
      const result = await session.run(
        `MATCH (v:Vehicle {id: $id}) RETURN v`,
        { id }
      );
      const record = result.records[0];
      if (!record) return undefined;

      const raw = record.get('v').properties;
      return VehicleMapper.toDomain(raw);
    } finally {
      await session.close();
    }
  }

    async findVehicleByPlate(plate: string): Promise<Vehicle | undefined> {
        const session = this.getSession();
        try {
        const result = await session.run(
            `MATCH (v:Vehicle {plate: $plate}) RETURN v`,
            { plate }
        );
        const record = result.records[0];
        if (!record) return undefined;
    
        const raw = record.get('v').properties;
        return VehicleMapper.toDomain(raw);
        } finally {
        await session.close();
        }
    }

  async findVehicleByEmail(email: string): Promise<Vehicle | undefined> {
    const session = this.getSession();
    try {
      const result = await session.run(
        `MATCH (v:Vehicle {email: $email}) RETURN v`,
        { email }
      );
      const record = result.records[0];
      if (!record) return undefined;

      const raw = record.get('v').properties;
      return VehicleMapper.toDomain(raw);
    } finally {
      await session.close();
    }
  }

  async findAll(skip = 0, limit = 10): Promise<FindVehiclesResponse> {
    const session = this.getSession();
    try {
      const result = await session.run(
        `
        MATCH (v:Vehicle)
        RETURN v SKIP $skip LIMIT $limit
        `,
        { skip, limit }
      );

      const countResult = await session.run(
        `MATCH (v:Vehicle) RETURN count(v) as total`
      );

      const vehicles = result.records.map((r) =>
        VehicleMapper.toDomain(r.get('v').properties)
      );
      const vehiclesCount = countResult.records[0].get('total').toInt();

      return { vehicles, vehiclesCount };
    } finally {
      await session.close();
    }
  }

  async connectToPerson(vehicleId: string, personId: string, type: string): Promise<void> {
  const session = this.getSession();

  // Validação básica: relacionamentos devem ser em UPPER_SNAKE_CASE
  const validRelType = /^[A-Z][A-Z0-9_]*$/;
  if (!validRelType.test(type)) {
    throw new Error(`Tipo de relacionamento inválido: ${type}`);
  }

  const query = `
    MATCH (v:Vehicle {id: $vehicleId}), (p:Person {id: $personId})
    MERGE (p)-[r:${type}]->(v)
  `;

  try {
    await session.run(query, { vehicleId, personId });
  } finally {
    await session.close();
  }
}

  async connectToConsult(vehicleId: string, consultId: string, type: string): Promise<void> {
    const session = this.getSession();
    try {
      await session.run(
        `
        MATCH (v:Vehicle {id: $vehicleId}), (c:Consult {id: $consultId})
        MERGE (c)-[:${type}]->(v)
        `,
        { vehicleId, consultId }
      );
    } finally {
      await session.close();
    }
  }
}