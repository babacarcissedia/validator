import Validator from "../src/Validator";

describe('Validator::email', () => {
  const rules = {
    name: 'email'
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

  it('should fail for not email values', async (done) => {

    for (const input of ['', 'domain.com', 'some[at]domain.com', 'some@domain', 'some@domain.']) {
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

  it('should success for email values', async (done) => {

    const prefixes = ['john', 'john123', 'john_doe', 'john_doe_123']
    const domains = ['.co', '.com', '.fr', '.sn', '.net', '.org', '.edu']
    const inputs: string[] = []
    for (const prefix of prefixes) {
      for (const domain of domains) {
        inputs.push(`${prefix}@domain${domain}`)
      }
    }
    for (const input of inputs) {
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

  it('should success for sub domain emails', async (done) => {

    const inputs = ['john@doe.edu.com', 'john123@sub.domain.example.com']
    for (const input of inputs) {
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
