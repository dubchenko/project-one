import { caclInterval } from '../../source/scripts/test.js'

describe('Test', () => {
  it('First', () => {
    const currentDate = new Date(2021, 2, 13, 23)
    const dateOfBirth = new Date(1990, 3, 1)

    expect(caclInterval({ currentDate, dateOfBirth })).toMatchObject({
      years: 30
    })
  })
})
