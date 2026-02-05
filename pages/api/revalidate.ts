import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../next.config';

const revalidate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body?.token || req.body.token !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }

  try {
    if (!config.i18n!.locales.includes(req.body.lang)) {
      return res.status(400).json({ success: false, error: 'Invalid language' });
    }

    const lang = req.body.lang === config.i18n!.defaultLocale ? '' : (req.body.lang as string);
    const slug = req.body.slug as string | undefined;
    const postId = req.body.postId as string | undefined;

    await res.revalidate(`/${lang}`);

    if (postId && slug) {
      await res.revalidate(`/${lang}/news/${postId}/${slug}`.replaceAll('//', '/'));
    }

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error revalidating');
  }
};

export default revalidate;