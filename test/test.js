const satisfies = require('../index')
const cases = require('./cases');

describe('satisfies', () => {
  it('should throw if the first argument is not a string', () => {
    let error;
    try{
      satisfies(['MIT'], 'Apache-2.0')
    }catch (e) {
      error = e;
    } finally {
      expect(error.message).toBe('Both arguments must be string.')
    }
  })

  it('should throw if the second argument is not a string', () => {
    let error;
    try{
      satisfies('MIT', ['Apache-2.0'])
    }catch (e) {
      error = e;
    } finally {
      expect(error.message).toBe('Both arguments must be string.')
    }
  })

  test.each(cases.satisfies)(
    "should return %p for satisfies(%p, %p)",
    (result, first, second) => {
      expect(satisfies(first, second)).toBe(result)
    }
  )
})
