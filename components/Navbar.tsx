'use client'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { signOut } from '../lib/auth'

type NavbarProps = {
  username: string;
  onSignOut: () => void;
};

const Navbar = ({ username, onSignOut }: NavbarProps) => {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut();           // borra la cookie en el servidor
    router.push('/login');     // redirige al login
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white text-lg font-semibold">
            PokeApp
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-white">Hola, {username}</span>
          
          <button
            onClick={handleSignOut}
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Desloguearse
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
