import { validateId } from '.';

describe('validate ID', () => {
  describe('parses numbers', () => {
    it('parses 1', () => {
      expect(validateId('1')).toEqual(1);
    });

    it('parses 0', () => {
      expect(validateId('0')).toEqual(0);
    });

    it('parses 101235123', () => {
      expect(validateId('101235123')).toEqual(101235123);
    });
  });

  describe('it cannot parse non-numbers', () => {
    test('null', () => {
      expect(() => validateId('null')).toThrow();
    });

    test('abc', () => {
      expect(() => validateId('abc')).toThrow();
    });

    test('undefined', () => {
      expect(() => validateId(undefined)).toThrow();
    });
  });
});
