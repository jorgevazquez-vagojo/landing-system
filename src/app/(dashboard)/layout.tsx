import { SessionProvider } from 'next-auth/react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex h-screen">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-background sm:p-6">
            <div className="animate-fade-in">{children}</div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
