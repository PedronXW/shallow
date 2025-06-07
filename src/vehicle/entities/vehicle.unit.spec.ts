import { Vehicle } from './vehicle'

describe('Vehicle', () => {
  it('should be able to create a new vehicle', () => {
    const vehicle = Vehicle.create({
      email: 'any_email',
      password: 'any_password',
    })

    expect(vehicle.email).toBe('any_email')
    expect(vehicle.password).toBe('any_password')
    expect(vehicle.deletedAt).toBeUndefined()
  })
})
