import * as React from 'react';
import Link from 'next/link';

import { NavItem } from '@/types/nav';
// import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex gap-6 md:gap-10">
      {/* <Link href="/" className="flex items-center space-x-2">
        <img src={theme === 'light' ? 'logo.png' : 'logo_white.png'} className="h-[2rem] md:h-[2.5rem]" />
      </Link> */}
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-sm font-medium text-muted-foreground',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
