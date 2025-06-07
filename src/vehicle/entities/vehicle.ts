import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

export type VehicleProps = {
  plate: string
  owner?: string
  previousOwners: string[]
}

export class Vehicle extends Entity<VehicleProps> {

  get plate(): string {
    return this.props.plate
  }

  set plate(value: string) {
    this.props.plate = value
  }

  get owner(): string | undefined {
    return this.props.owner
  }

  set owner(value: string) {
    this.props.owner = value
  }

  get previousOwners(): string[] {
    return this.props.previousOwners
  }

  set previousOwners(value: string[]) {
    this.props.previousOwners = value
  }

  static create(props: Optional<VehicleProps, 'owner' |  'previousOwners'>, id?: EntityId): Vehicle {
    const vehicle = new Vehicle(
      {
        ...props,
        previousOwners: props.previousOwners ?? [],
      },
      id,
    )
    return vehicle
  }
}
