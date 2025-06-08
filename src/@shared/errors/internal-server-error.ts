import { ServiceError } from '@/@shared/errors/service-error'

export class InternalServerError extends Error implements ServiceError {
  constructor(entity: string) {
    super(`Internal server error, entity: ${entity}`)
  }
}
