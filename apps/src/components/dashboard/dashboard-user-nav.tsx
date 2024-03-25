import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/';
import { useTranslation } from '@/services/i18n/client';
import { ThemeToggle } from '../theme-toggle';

export function DashboardUserNav() {
  const { t } = useTranslation('dashboard-user-nav');

  return (
    <>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">shadcn</p>
              <p className="text-xs leading-none text-muted-foreground">
                m@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {t('dashboard-user-nav:profile.title')}
              <DropdownMenuShortcut>
                ⇧⌘{t('dashboard-user-nav:profile.shortcut')}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t('dashboard-user-nav:billing.title')}
              <DropdownMenuShortcut>
                ⌘{t('dashboard-user-nav:billing.shortcut')}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t('dashboard-user-nav:settings.title')}
              <DropdownMenuShortcut>
                ⌘{t('dashboard-user-nav:settings.shortcut')}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t('dashboard-user-nav:new-team.title')}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {t('dashboard-user-nav:logout.title')}
            <DropdownMenuShortcut>
              ⇧⌘{t('dashboard-user-nav:logout.shortcut')}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
