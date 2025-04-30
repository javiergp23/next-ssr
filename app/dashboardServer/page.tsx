import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Dashboard from '../dashboard/page'; 
import Navbar from '@/components/Navbar';

export default function DashboardPage( ) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login'); 
  }

  return (<Dashboard username={token.value} /> <Navbar username={token.value} />);
}
