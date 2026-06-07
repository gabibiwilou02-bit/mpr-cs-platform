'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarIntegration() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Intégrations', href: '/integration' },
    { label: 'Documentation', href: '/integration/docs' },
    { label: 'Paramètres', href: '/integration/settings' },
  ];

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Titre */}
        <div className="font-bold text-lg text-gray-900">
          MPR & CS
        </div>

        {/* Navigation */}
        <ul className="flex gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}