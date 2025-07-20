'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/SideBarContext';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function SideBar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebar();
  const { user } = useAuth();

  if (!user) return null;

  const menu = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Product', path: '/products' },
    { name: 'Customer', path: '/customers' },
  ];

  return (
    <div className={`bg-gray-800 text-white h-screen p-4 ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
      <button
        onClick={toggleSidebar}
        className="mb-4 bg-indigo-600 px-2 py-1 rounded"
      >
        ☰
      </button>
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`p-2 rounded hover:bg-gray-700 ${pathname === item.path ? 'bg-gray-700' : ''}`}
          >
            {isOpen ? item.name : item.name.charAt(0)}
          </Link>
        ))}
      </nav>
       <button onClick={() => signOut(auth)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}
