import Validator from "../src/Validator";

describe('Validator::min_length', () => {
  const rules = {
    name: 'min_length:3'
  }

  it('should not fail when field is not present', async (done) => {

    const v = await Validator.make({
      data: {
      },
      rules
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('name')
    done()
  })

  it('should fail for string length lt expected', async (done) => {

    for (const input of [1, 12, 'ab', 'a', '']) {
      const v = await Validator.make({
        data: {
          name: input
        },
        rules
      })
      expect(v.fails()).toBe(true)
      expect(v.getErrors()).toHaveProperty('name')
    }
    done()
  })

  it('should success for string length gt expected', async (done) => {

    for (const input of ['some value', 123456]) {
      const v = await Validator.make({
        data: {
          name: input
        },
        rules
      })
      expect(v.fails()).toBe(false)
      expect(v.getErrors()).not.toHaveProperty('name')
    }
    done()
  })
})
