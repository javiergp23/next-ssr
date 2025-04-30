'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      router.push('/dashboard'); // Redireccionamos
    } else {
      const error = await res.json();
      alert(error.error);
    }
  };
    return (
      <div className="flex flex-col min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onClick={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Iniciar Sesión</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Ingresar
        </button>
      </form>
      <div className="mt-4">Aún no tienes una cuenta? <button><Link href='/register' className="text-blue-600  cursor-pointer">Ingresa</Link></button></div>
    </div>
    )
}

export default Login;