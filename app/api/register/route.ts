import { NextResponse } from 'next/server';
import { getUsers, addUser } from '@/lib/users'; // Importamos desde lib/users

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
  }

  const users = getUsers();

  const userExists = users.find(user => user.username === username);

  if (userExists) {
    return NextResponse.json({ error: 'El usuario ya existe' }, { status: 409 });
  }

  addUser({ username, password }); // Guardamos el nuevo usuario
  return NextResponse.json({ message: 'Usuario registrado exitosamente' });
}
