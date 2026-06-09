import * as bcrypt from 'bcryptjs';

async function generarHash() {
  const hash = await bcrypt.hash(
    '123456',
    10,
  );

  console.log(hash);
}

generarHash();