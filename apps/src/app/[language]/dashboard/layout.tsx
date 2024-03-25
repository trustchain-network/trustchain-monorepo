import { cn } from '@/lib/utils';
import '@/styles/dashboard.css';
import DashboardSideNav from '@/components/dashboard/dashboard-side-nav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn('min-h-screen w-full flex', {
            'debug-screens': process.env.NODE_ENV === 'development',
          })}
        >
          <DashboardSideNav />
          <div className="p-8 w-full">{children}</div>
        </body>
      </html>
    </>
  );
}
