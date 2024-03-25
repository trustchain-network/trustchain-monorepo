import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useTranslation } from '@/services/i18n/client';

export function DashBoardMainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation('dashboard-main-nav');

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        {t('dashboard-main-nav:dashboard.title')}
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t('dashboard-main-nav:links.settings')}
      </Link>
    </nav>
  );
}
