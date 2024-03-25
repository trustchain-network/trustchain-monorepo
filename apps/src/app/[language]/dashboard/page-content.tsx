'use client';
import { RoleEnum } from '@/services/api/types/role';
import withPageRequiredAuth from '@/services/auth/with-page-required-auth';
import { useTranslation } from '@/services/i18n/client';

function Dashboard() {
  const { t } = useTranslation('dashboard-home');

  return (
    <>
      <h1>{t('dashboard-home:title')}</h1>
    </>
  );
}

export default withPageRequiredAuth(Dashboard, { roles: [RoleEnum.USER] });
