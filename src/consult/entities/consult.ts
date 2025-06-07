import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

export type ConsultProps = {
  type: string
  input: object
  output?: object
}

export class Consult extends Entity<ConsultProps> {

  get type(): string {
    return this.props.type
  }

  set type(value: string) {
    this.props.type = value
  }

  get input(): object {
    return this.props.input
  }

  set input(value: object) {
    this.props.input = value
  }

  get output(): object | undefined {
    return this.props.output
  }

  set output(value: object | undefined) {
    this.props.output = value
  }

  static create(props: Optional<ConsultProps, 'output'>, id?: EntityId): Consult {
    const consult = new Consult(
      {
        ...props,
      },
      id,
    )
    return consult
  }
}
