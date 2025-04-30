import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Ruta al archivo JSON donde se guardan los usuarios
  const filePath = path.join(process.cwd(), 'data', 'users.json');

  try {
    // Leer y parsear el archivo
    const fileData = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    // Verificar si el usuario existe
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (!user) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Crear respuesta con cookie
    const response = NextResponse.json({ message: 'Login exitoso' });

    response.cookies.set('token', username, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar el login' }, { status: 500 });
  }
}
