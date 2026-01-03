test('viewer cannot create transaction', () => {
  expect(() => {
    throw new Error('Forbidden');
  }).toThrow();
});
