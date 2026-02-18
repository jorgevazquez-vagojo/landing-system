'use client';

import { signOut, useSession } from 'next-auth/react';
import { ThemeToggle } from './theme-toggle';
import { MobileSidebar } from './mobile-sidebar';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <MobileSidebar />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {session?.user && (
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-card-foreground">{session.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {(session.user as Record<string, unknown>).companyName as string}
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              {session.user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
