const CapitalizeNameHelps = require('src/infra/support/helpers/CapitalizeNameHelps');

describe('src :: infra :: support :: helpers :: CapitalizeNameHelps', () => {
  it('should capitalize the first letter of each word', () => {
    const input = 'john doe';
    const output = CapitalizeNameHelps(input);
    expect(output).toBe('John Doe');
  });

  it('should handle multiple spaces between words', () => {
    const input = 'john   doe';
    const output = CapitalizeNameHelps(input);
    expect(output).toBe('John   Doe');
  });

  it('should handle a single word', () => {
    const input = 'john';
    const output = CapitalizeNameHelps(input);
    expect(output).toBe('John');
  });

  it('should handle already capitalized words', () => {
    const input = 'John Doe';
    const output = CapitalizeNameHelps(input);
    expect(output).toBe('John Doe');
  });

  it('should handle empty strings', () => {
    const input = '';
    const output = CapitalizeNameHelps(input);
    expect(output).toBe('');
  });

  it('should handle strings with leading and trailing spaces', () => {
    const input = '  john doe  ';
    const output = CapitalizeNameHelps(input);
    expect(output).toBe('  John Doe  ');
  });

  it('should handle strings with special characters', () => {
    const input = 'john-doe';
    const output = CapitalizeNameHelps(input);
    expect(output).toBe('John-doe');
  });

  it('should not crash with null or undefined', () => {
    expect(() => CapitalizeNameHelps(null)).toThrow();
    expect(() => CapitalizeNameHelps(undefined)).toThrow();
  });
});
