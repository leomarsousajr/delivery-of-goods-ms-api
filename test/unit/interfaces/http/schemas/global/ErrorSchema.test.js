const errorSchema = require('src/interfaces/http/schemas/global/ErrorSchema')();

describe('interfaces :: http :: schemas :: global :: ErrorSchema', () => {
  describe('#validate', () => {
    describe('When the method receives all the necessary attributes', () => {
      it('Should be successfully called', () => {
        const data = {
          error_code: '1-500',
          message: 'Error message',
          details: [
            {
              message: '"field" is required',
              path: ['field']
            }
          ],
          stack_trace: 'Error: Error message\n ...'
        };
        const result = errorSchema.validate(data);

        expect(result.error).toBeUndefined();
      });
    });

    describe('When the method does not receive all the necessary attributes', () => {
      it('Should be called and return an error', () => {
        const data = {};
        const result = errorSchema.validate(data);

        expect(result.error).not.toBeUndefined();
      });
    });
  });
});
