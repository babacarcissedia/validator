import moment from 'moment'
import Validator from "../src/Validator";

describe('Validator::before(field, date)', () => {

  it('should not fail when field is not present', async (done) => {

    const v = await Validator.make({
      data: {},
      rules: { at: 'before:2020-05-15' }
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('at')
    done()
  })

  it('should fail when date params is not valid', async () => {
    const v = await Validator.make({
      data: { at: 'invalid date string' },
      rules: { at: 'before:2020-05-10' }
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('at')
  })

  it('should fail when date input is not valid', async () => {
    const v = await Validator.make({
      data: { at: 'invalid date string' },
      rules: { at: 'before:2020-05-10' }
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('at')
  })

  it('should fail when date input is not valid', async () => {
    const v = await Validator.make({
      data: { at: '2020-05-10' },
      rules: { at: 'before:invalid date string' }
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('at')
  })

  it('should succeed when date input is before specified min date', async () => {
    const v = await Validator.make({
      data: { at: '2020-05-15' },
      rules: { at: 'before:2020-05-01' }
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('at')
  })

  it('should fail when date input is before specified min date', async () => {
    const v = await Validator.make({
      data: { at: '2020-04-15' },
      rules: { at: 'before:2020-05-01' }
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('at')
  })

  describe('today as argument', () => {
    it('should succeed when date input is before specified min date', async () => {
      const v = await Validator.make({
        data: { at: moment().add(-1, 'day').format('YYYY-MM-DD') },
        rules: { at: 'before:today' }
      })
      expect(v.fails()).toBe(false)
      expect(v.getErrors()).not.toHaveProperty('at')
    })

    it('should fail when date input is before specified min date', async () => {
      const v = await Validator.make({
        data: { at: moment().add(1, 'day').format('YYYY-MM-DD') },
        rules: { at: 'before:today' }
      })
      expect(v.fails()).toBe(true)
      expect(v.getErrors()).toHaveProperty('at')
    })
  })
})
