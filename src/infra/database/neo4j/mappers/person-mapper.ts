import { EntityId } from '@/@shared/entities/entity-id';
import { Person } from '@/person/entities/person';

export class PersonMapper {
  static toDomain(raw: any): Person {
    return Person.create(
      {
        identification: raw.identification,
      },
      new EntityId(raw.id),
    );
  }

  static toPersistence(person: Person): Record<string, any> {
    return {
      id: person.id.toString(),
      identification: person.identification,
    };
  }
}