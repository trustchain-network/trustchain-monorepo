'use client';
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Group,
  LayoutDashboard,
  Nfc,
  Settings,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { useTranslation } from '@/services/i18n/client';
import { Button, SideNav } from '../ui/';

type Props = {};

export default function DashboardSideNav(props: Props) {
  const { t } = useTranslation('dashboard-side-nav');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <>
      <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24">
        {!mobileWidth && (
          <div className="absolute right-[-20px] top-7">
            <Button
              onClick={toggleSidebar}
              variant="secondary"
              className="rounded-full p-2"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        )}
        <SideNav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: t('dashboard-side-nav:dashboard.title'),
              icon: LayoutDashboard,
              variant: 'default',
              href: '/dashboard',
            },
            {
              title: t('dashboard-side-nav:tags.title'),
              icon: Nfc,
              variant: 'ghost',
              href: '/dashboard/tags',
            },
            {
              title: t('dashboard-side-nav:categories.title'),
              icon: Group,
              variant: 'ghost',
              href: '/dashboard/categories',
            },
            {
              title: t('dashboard-side-nav:subscription.title'),
              icon: CalendarCheck,
              variant: 'ghost',
              href: '/dashboard/subscription',
            },
          ]}
        />
      </div>
    </>
  );
}
