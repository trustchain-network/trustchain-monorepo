import { useTranslation } from '@/services/i18n/client';

export default function TagsPage() {
  const { t } = useTranslation('categories');
  return <h1>Categories</h1>;
}
