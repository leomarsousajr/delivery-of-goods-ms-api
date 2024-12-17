const ContractException = require('src/infra/exceptions/ContractException');
const ValidatorMiddleware = require('src/interfaces/http/middlewares/ValidatorMiddleware');

jest.mock('src/infra/exceptions/ContractException');

describe('interfaces :: http :: middlewares :: ValidatorMiddleware', () => {
  describe('#validate', () => {
    let validate, schemas, req, next, appCode, validatorMiddleware, fn;
    const options = { abortEarly: false, convert: false, allowUnknown: true, stripUnknown: true };
    const error = new Error('Bad Request');

    describe('When the validate middleware is called', () => {
      beforeEach(() => {
        validate = jest.fn();
        schemas = { params: { validate }, query: { validate } };
        req = { params: { type: 'openapi' }, query: { download: false } };
        next = jest.fn();
        appCode = '1';
        validatorMiddleware = ValidatorMiddleware({ appCode });
      });

      it('Should be successfully called', () => {
        const expected = expect.any(Function);

        fn = validatorMiddleware.validate(schemas);

        expect(fn).toEqual(expected);
      });
    });

    describe('When the method is called and receives all the necessary attributes', () => {
      beforeEach(() => {
        validate.mockReturnValueOnce({ value: req.params }).mockReturnValueOnce({ value: req.query });
      });

      it('Should be successfully called', () => {
        const result = fn(req, null, next);

        expect(validate).toHaveBeenCalledTimes(2);
        expect(validate).toHaveBeenNthCalledWith(1, req.params, options);
        expect(validate).toHaveBeenNthCalledWith(2, req.query, options);
        expect(ContractException).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledOnce();
        expect(result).toBeUndefined();
      });
    });

    describe('When the method is called and does not receive all the necessary attributes', () => {
      beforeEach(() => {
        validate.mockReturnValueOnce({ error });
        ContractException.mockReturnValue(error);
      });

      it('Should be called and throw an error', () => {
        try {
          fn(req, null, next);
        } catch (result) {
          expect(validate).toHaveBeenCalledOnce();
          expect(validate).toHaveBeenCalledWith(req.params, options);
          expect(ContractException).toHaveBeenCalledOnce();
          expect(ContractException).toHaveBeenCalledWith(error, appCode);
          expect(next).toHaveBeenCalledOnce();
          expect(next).toHaveBeenCalledWith(error);
          expect(result).toEqual(error);
        }
      });
    });
  });
});
