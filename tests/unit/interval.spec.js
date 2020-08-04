import { caclInterval } from '../../source/scripts/interval.js'

describe('Check interval calculation', () => {
  it('Current date is equal to the date of birth', () => {
    const currentDate = new Date(2020, 2, 14)
    const dateOfBirth = new Date(1990, 2, 14)

    expect(caclInterval({ currentDate, dateOfBirth })).toMatchObject({
      years: '30',
      millisecond: '000000000'
    })
  })

  it('Current date later than the date of birth', () => {
    const currentDate = new Date(2020, 2, 15)
    const dateOfBirth = new Date(1990, 2, 14)

    expect(caclInterval({ currentDate, dateOfBirth })).toMatchObject({
      years: '30',
      millisecond: '002739726'
    })
  })
})
