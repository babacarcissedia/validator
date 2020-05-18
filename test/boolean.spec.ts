import Validator from "../src/Validator";
import * as faker from 'faker'

describe('Validator::boolean', () => {
  const rules = {
    accept: 'boolean'
  }

  it('should not fail when field is not present', async (done) => {

    const v = await Validator.make({
      data: {},
      rules
    })
    expect(v.fails()).toBe(false)
    expect(v.getErrors()).not.toHaveProperty('accept')
    done()
  })

  it('should success for boolean values', async (done) => {
    const inputs = [true, false, 'true', 'false', 1, 0, '1', '0']
    for (const input of inputs) {
      const v = await Validator.make({
        data: {
          accept: input
        },
        rules
      })
      expect(v.fails()).toBe(false)
      expect(v.getErrors()).not.toHaveProperty('accept')
    }
    done()
  })

  it('should fail for anything else', async () => {
    const inputs = [faker.lorem.text(), faker.random.number()]
    for (const input of inputs) {
      const v = await Validator.make({
        data: {
          accept: input
        },
        rules
      })
      expect(v.fails()).toBe(true)
      expect(v.getErrors()).toHaveProperty('accept')
    }
  })
})
