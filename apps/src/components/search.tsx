import { useTranslation } from '@/services/i18n/client';
import { Input } from './ui/input';

export function Search() {
  const { t } = useTranslation('search');
  return (
    <div>
      <Input
        type="search"
        placeholder={t('search:placeholder')}
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
}
