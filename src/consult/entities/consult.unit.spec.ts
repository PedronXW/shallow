import { Consult } from './consult'

describe('Consult', () => {
  it('should be able to create a new consult', () => {
    const consult = Consult.create({
      email: 'any_email',
      password: 'any_password',
    })

    expect(consult.email).toBe('any_email')
    expect(consult.password).toBe('any_password')
    expect(consult.deletedAt).toBeUndefined()
  })
})
