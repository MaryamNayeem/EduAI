'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Chatbot', path: '/chatbot' },
  { name: 'Mind Map', path: '/mindmap' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Login', path: '/login' },
  { name: 'Signup', path: '/signup' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="navbar">
      <ul>
        {links.map(link => (
          <li key={link.name} className={pathname === link.path ? 'active' : ''}>
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
