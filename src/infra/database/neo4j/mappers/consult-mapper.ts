import { EntityId } from '@/@shared/entities/entity-id';
import { Consult } from '@/consult/entities/consult';

export class ConsultMapper {
  static toDomain(raw: any): Consult {
    return Consult.create(
      {
        type: raw.type,
        input: JSON.parse(raw.input),
        output: raw.output ? JSON.parse(raw.output): undefined,
      },
      new EntityId(raw.id),
    );
  }

  static toPersistence(consult: Consult): Record<string, any> {
    return {
      id: consult.id.getValue(),
      type: consult.type,
      input: JSON.stringify(consult.input),
      output: JSON.stringify(consult.output),
    };
  }
}