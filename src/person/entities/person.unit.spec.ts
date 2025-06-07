import { Person } from './person'

describe('Person', () => {
  it('should be able to create a new person', () => {
    const person = Person.create({
      email: 'any_email',
      password: 'any_password',
    })

    expect(person.email).toBe('any_email')
    expect(person.password).toBe('any_password')
    expect(person.deletedAt).toBeUndefined()
  })
})
