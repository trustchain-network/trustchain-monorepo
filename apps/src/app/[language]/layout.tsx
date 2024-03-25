import type { Metadata } from 'next';
import { dir } from 'i18next';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import AuthProvider from '@/services/auth/auth-provider';
import '@/styles/globals.css';
import '@/services/i18n/config';
import { languages } from '@/services/i18n/config';
import SnackbarProvider from '@/components/snackbar-provider';
import { getServerTranslation } from '@/services/i18n';
import StoreLanguageProvider from '@/services/i18n/store-language-provider';
import LeavePageProvider from '@/services/leave-page/leave-page-provider';
import QueryClientProvider from '@/services/react-query/query-client-provider';
import queryClient from '@/services/react-query/query-client';
import ReactQueryDevtools from '@/services/react-query/react-query-devtools';
import GoogleAuthProvider from '@/services/social-auth/google/google-auth-provider';
import FacebookAuthProvider from '@/services/social-auth/facebook/facebook-auth-provider';
import ConfirmDialogProvider from '@/components/confirm-dialog/confirm-dialog-provider';

import { ThemeProvider } from '@/components/theme/';
import { SiteHeader } from '@/components/site-header';

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, 'common');

  return {
    title: t('title'),
  };
}

export function generateStaticParams() {
  return languages.map((language) => ({ language }));
}

export default function RootLayout({
  children,
  params: { language },
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  return (
    <html lang={language} dir={dir(language)} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {/* <InitColorSchemeScript /> */}
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* <CssBaseline /> */}
            <SnackbarProvider maxSnack={3}>
              <StoreLanguageProvider>
                <ConfirmDialogProvider>
                  <AuthProvider>
                    <GoogleAuthProvider>
                      <FacebookAuthProvider>
                        <LeavePageProvider>
                          <SiteHeader />
                          {/* <ResponsiveAppBar /> */}
                          {children}
                        </LeavePageProvider>
                      </FacebookAuthProvider>
                    </GoogleAuthProvider>
                  </AuthProvider>
                </ConfirmDialogProvider>
              </StoreLanguageProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
