import Validator from "../src/Validator";

describe('Validator Core', () => {
  it('::after hook', () => {
    const sum = (a, b) => a + b
    expect(sum(1, 1)).toBe(2)
    expect(sum(4, 1)).toBe(5)
    expect(sum(1, 4)).toBe(5)
    expect(sum(4, 5)).toBe(9)
  })
})
