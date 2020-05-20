import Validator from "../src/Validator";

describe('Validator::date(field)', () => {

  it('should not fail when field is not present', async (done) => {

    const v = await Validator.make({
      data: {},
      rules: { at: 'date' }
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('at')
    done()
  })

  it('should fail when date params is not valid', async () => {
    const v = await Validator.make({
      data: { at: 'invalid date string' },
      rules: { at: 'date' }
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('at')
  })

  it('should not fail when date format is yyyy-mm', async () => {
    const v = await Validator.make({
      data: { at: '2020-05' },
      rules: { at: 'date' }
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('at')
  })

  it('should not fail when date format is yyyy', async () => {
    const v = await Validator.make({
      data: { at: '2020-05' },
      rules: { at: 'date' }
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('at')
  })

  it('should fail when month is not valid', async () => {
    const v = await Validator.make({
      data: { at: '2020-13-10' },
      rules: { at: 'date' }
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('at')
  })

  it('should fail when day is not valid', async () => {
    const v = await Validator.make({
      data: { at: '2020-13-32' },
      rules: { at: 'date' }
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('at')
  })

  it('should succeed when input is a valid date', async () => {
    const v = await Validator.make({
      data: { at: '2020-05-15' },
      rules: { at: 'date' }
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('at')
  })
})
