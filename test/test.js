const api = require('../index')
const cases = require('./cases')

Object.keys(api).forEach((f) => {
  describe(f, () => {
    test.each(cases[f].error)(
      'should throw the error %p for satisfies(%p, %p)',
      (message, first, second) => {
        let error
        try {
          api[f](first, second)
        } catch (e) {
          error = e
        } finally {
          expect(error.message).toBe(message)
        }
      }
    )

    test.each(cases[f].valid)(
      'should return %p for satisfies(%p, %p)',
      (result, first, second) => {
        expect(api[f](first, second)).toBe(result)
      }
    )
  })
})
