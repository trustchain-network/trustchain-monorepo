'use client';

import { Separator } from '@/components/ui';
import { NotificationsForm } from './notifications-form';
import { useTranslation } from '@/services/i18n/client';

export default function SettingsNotificationsPage() {
  const { t } = useTranslation('settings-notifications');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {t('settings-notifications:title')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t('settings-notifications:description')}
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}
