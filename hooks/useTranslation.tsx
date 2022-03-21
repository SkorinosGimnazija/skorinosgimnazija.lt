import { useRouter } from 'next/router';
import { translation } from '../translation/i18n';

export const useTranslation = () => {
  const { locale } = useRouter();
  return { t: translation[locale], locale };
};
