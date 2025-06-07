import { EntityId } from '@/@shared/entities/entity-id';
import { Consult } from '@/consult/entities/consult';

export class ConsultMapper {
  static toDomain(raw: any): Consult {
    return Consult.create(
      {
        type: raw.type,
        input: raw.input,
        output: raw.output, // pode ser undefined
      },
      new EntityId(raw.id),
    );
  }

  static toPersistence(consult: Consult): Record<string, any> {
    return {
      id: consult.id.toString(),
      type: consult.type,
      input: consult.input,
      output: consult.output,
    };
  }
}