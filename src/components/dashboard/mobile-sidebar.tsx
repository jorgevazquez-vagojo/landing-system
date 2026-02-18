'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z' },
  { name: 'Landings', href: '/dashboard/landings', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8m8 4H8m2-8H8' },
  { name: 'Templates', href: '/dashboard/templates', icon: 'M3 3h18v18H3V3zm0 6h18M9 9v12' },
  { name: 'Leads', href: '/dashboard/leads', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 4a4 4 0 0 0 0-8' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: 'M18 20V10m-6 10V4M6 20v-6' },
  { name: 'Media', href: '/dashboard/media', icon: 'M3 3h18v18H3V3zm3.5 8.5 3-3L15 14l3-3M8.5 8.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' },
  { name: 'Integrations', href: '/dashboard/integrations', icon: 'M12 22v-5m-3-3V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v9m-6 0h6a3 3 0 0 1-6 0z' },
  { name: 'SEO', href: '/dashboard/seo', icon: 'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm10 18-4.35-4.35' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8.7-2.7a1.6 1.6 0 0 0 .3-1.3l-1-1a8 8 0 0 0 0-1l1-1a1.6 1.6 0 0 0-.3-1.3l-1.4-1.4a1.6 1.6 0 0 0-1.3-.3l-1 1a8 8 0 0 0-1 0l-1-1a1.6 1.6 0 0 0-1.3.3L11.3 3.3a1.6 1.6 0 0 0-.3 1.3l1 1a8 8 0 0 0 0 1l-1 1a1.6 1.6 0 0 0 .3 1.3l1.4 1.4' },
];

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 lg:hidden"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 animate-slide-in-left bg-sidebar shadow-xl lg:hidden">
            <div className="flex h-16 items-center justify-between px-6">
              <Link href="/dashboard" className="text-xl font-bold text-foreground">
                Landing<span className="text-primary">System</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    )}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
