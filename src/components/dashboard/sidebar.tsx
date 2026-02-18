'use client';

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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="text-xl font-bold text-foreground">
          Landing<span className="text-primary">System</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground'
              )}
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border px-6 py-4">
        <p className="text-xs text-muted-foreground">Landing System v1.0</p>
      </div>
    </aside>
  );
}
