import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'

export type PersonProps = {
  identification: string
}

export class Person extends Entity<PersonProps> {

  get identification(): string {
    return this.props.identification
  }

  set identification(value: string) {
    this.props.identification = value
  }

  static create(props: PersonProps, id?: EntityId): Person {
    const person = new Person(
      {
        ...props,
      },
      id,
    )
    return person
  }
}
