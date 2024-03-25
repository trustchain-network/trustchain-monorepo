'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui';
import { useTranslation } from '@/services/i18n/client';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation('theme-toggle');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="my-2"
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
      <span className="sr-only">{t('theme-toggle:title')}</span>
    </Button>
  );
}
