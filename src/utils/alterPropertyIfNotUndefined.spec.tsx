import { alterPropertyIfNotUndefined } from './alterPropertyIfNotUndefined';

describe('#alterPropertyIfNotUndefined', () => {
  const baseTestObject = Object.freeze({
    property1: 'yellow',
    property2: 100,
    property3: [],
  })

  describe('altering existing properties', () => {
    it('should alter a property if it is defined', () => {
      const newProperties = {
        property1: 'dingus',
      }

      expect(alterPropertyIfNotUndefined(baseTestObject, newProperties)).toEqual({
        ...baseTestObject,
        ...newProperties,
      });
    });
  
    it('should alter a property if it is null', () => {
      const newProperties = {
        property2: null,
      }

      expect(alterPropertyIfNotUndefined(baseTestObject, newProperties)).toEqual({
        ...baseTestObject,
        ...newProperties,
      });
    });
  
    it('should not alter a property if it is undefined', () => {
      const newProperties = {
        property3: undefined,
      }

      expect(alterPropertyIfNotUndefined(baseTestObject, newProperties)).toEqual(baseTestObject);
    });
  });

  describe('adding properties', () => {
    it('should add a property if it is not already defined', () => {
      const newProperties = {
        property4: {},
      }

      expect(alterPropertyIfNotUndefined(baseTestObject, newProperties)).toEqual({
        ...baseTestObject,
        ...newProperties,
      });
    });
  
    it('should not add a property if it is undefined and not an existing property', () => {
      const newProperties = {
        property4: undefined,
      }

      expect(alterPropertyIfNotUndefined(baseTestObject, newProperties)).toEqual(baseTestObject);
    });
  });
});