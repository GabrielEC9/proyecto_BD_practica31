import bcrypt from 'bcryptjs';

const usuarios = [
  { email: 'gabriel@gmail.com', password: 'admin' },
  { email: 'caro@gmail.com', password: '1234' },
];

async function generarUsuarios() {
  for (const user of usuarios) {
    const hash = await bcrypt.hash(user.password, 10);
    console.log(
      `INSERT INTO "UsuarioORM" ("usuario", "password", "createdAt") VALUES ('${user.email}', '${hash}', NOW());`
    );
  }
}

generarUsuarios();
