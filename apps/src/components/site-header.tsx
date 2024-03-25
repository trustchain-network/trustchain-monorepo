'use client';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import { SiteHeaderButtons } from './site-header-buttons';
import { useTranslation } from '@/services/i18n/client';

export const SiteHeader = () => {
  const { t } = useTranslation('site-header');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Icons.gitHub className="size-5" />
                <span className="sr-only">{t('site-header:icon.github')}</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Icons.twitter className="size-4 fill-current" />
                <span className="sr-only">{t('site-header:icon.twitter')}</span>
              </div>
            </Link>
            <SiteHeaderButtons />
          </nav>
        </div>
      </div>
    </header>
  );
};
