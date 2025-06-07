import { ConsultFactory } from 'test/factories/unit/ConsultFactory'
import { InMemoryConsultRepository } from 'test/repositories/InMemoryConsultRepository'
import { NonExistsError } from '../../@shared/errors/non-exists-error'
import { FindConsultByIdService } from './find-by-id'

let sut: FindConsultByIdService
let inMemoryConsultRepository: InMemoryConsultRepository

describe('Find Consult By ID', () => {
  beforeEach(() => {
    inMemoryConsultRepository = new InMemoryConsultRepository()
    sut = new FindConsultByIdService(inMemoryConsultRepository)
  })

  it('should be able to find a consult by id', async () => {
    const consult = await ConsultFactory.create({
      email: 'anyemail@email.com',
    })

    await inMemoryConsultRepository.createConsult(consult)

    const result = await sut.execute({
      id: consult.id.getValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryConsultRepository.consults[0].id).toEqual(consult.id)
  })

  it('should be able to not find a consult because a wrong id', async () => {
    const consult = await ConsultFactory.create({
      email: 'anyemail@email.com',
    })

    await inMemoryConsultRepository.createConsult(consult)

    const result = await sut.execute({
      id: 'wrong id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NonExistsError)
  })
})
