import bcrypt from 'bcrypt';

it('should encrypt user password', async () => {
  const hash = await bcrypt.hash('123123', 8);

  const compareHash = await bcrypt.compare('123123', hash);

  expect(compareHash).toBe(true);
});
