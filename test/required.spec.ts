import Validator from "../src/Validator";

describe('Validator::required', () => {
  const rules = {
    name: 'required'
  }

  it('should fail when field is not present', async (done) => {

    const v = await Validator.make({
      data: {
      },
      rules
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('name')
    done()
  })

  it('should fail for empty field', async (done) => {

    const v = await Validator.make({
      data: {
        name: ''
      },
      rules
    })
    expect(v.fails()).toBe(true)
    expect(v.getErrors()).toHaveProperty('name')
    done()
  })

  it('should success for field with value', async (done) => {

    const v = await Validator.make({
      data: {
        name: 'some value'
      },
      rules
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('name')
    done()
  })
})
