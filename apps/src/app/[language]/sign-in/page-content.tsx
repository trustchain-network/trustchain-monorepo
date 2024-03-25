'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/ui/';
import { useTranslation } from '@/services/i18n/client';
import SocialAuth from '@/services/social-auth/social-auth';
import { isGoogleAuthEnabled } from '@/services/social-auth/google/google-config';
import { isFacebookAuthEnabled } from '@/services/social-auth/facebook/facebook-config';
import { Container } from '@/components/container';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation('sign-in');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <Container>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('sign-in:card.title')}</CardTitle>
          <CardDescription>{t('sign-in:card.description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    {t('sign-in:inputs.email.label')}
                  </Label>
                  <Input
                    id="email"
                    placeholder={t('sign-in:inputs.email.placeholder')}
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In with Email
                </Button>
              </div>
              {[isGoogleAuthEnabled, isFacebookAuthEnabled].some(Boolean) && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        {t('sign-in:or')}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <SocialAuth />
                    {/* <Button variant="outline">
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                      )}{" "}
                      GitHub
                    </Button> */}
                  </div>
                </>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
