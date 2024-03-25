import type { Metadata } from 'next';
import { getServerTranslation } from '@/services/i18n';
import { UserAuthForm } from './page-content';

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, 'sign-in');

  return {
    title: t('title'),
  };
}

export default UserAuthForm;
