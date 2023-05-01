interface Translation {
  [key: string]: {
    schoolName: string;
    schoolNameShort: string;
    schoolAdress: string;
    schoolPhone: string;
    schoolEmail: string;

    modified: string;
    sitemap: string;
    pageNotFound: string;
    moreNews: string;
    next: string;
    previous: string;
  };
}

export const translation: Translation = {
  lt: {
    schoolName: 'Vilniaus Pranciškaus Skorinos gimnazija',
    schoolNameShort: 'P. Skorinos Gimnazija',
    schoolAdress: 'Sietyno g. 21, Vilnius LT-04316',
    schoolPhone: 'Tel. / faksas +370 5 245 9127',
    schoolEmail: 'rastine@skorinos.vilnius.lm.lt',

    modified: 'Atnaujinta',
    sitemap: 'Svetainės medis',
    pageNotFound: 'Puslapis nerastas',
    moreNews: 'Daugiau naujienų',
    next: 'Kitas',
    previous: 'Ankstesnis',
  },
  by: {
    schoolName: 'Віленская гімназія імя Францыска Скарыны',
    schoolNameShort: 'Гімназія імя Ф. Скарыны',
    schoolAdress: 'Вул. Сеціно, 21 Вільнюс LT-04316',
    schoolPhone: 'Tэл. / факс +370 5 245 9127',
    schoolEmail: 'rastine@skorinos.vilnius.lm.lt',

    modified: 'Абноўлена',
    sitemap: 'Карта сайта',
    pageNotFound: 'Старонка не знойдзена',
    moreNews: 'Больш навін',
    next: 'Наступны',
    previous: 'Папярэдні',
  },
  en: {
    schoolName: 'Vilnius Pranciskaus Skorinos Gymnasium',
    schoolNameShort: 'P. Skorinos Gymnasium',
    schoolAdress: 'Sietyno str. 21, Vilnius LT-04316',
    schoolPhone: 'Phone / fax +370 5 245 9127',
    schoolEmail: 'rastine@skorinos.vilnius.lm.lt',

    modified: 'Updated',
    sitemap: 'Sitemap',
    pageNotFound: 'Page not found',
    moreNews: 'More news',
    next: 'Next',
    previous: 'Previous',
  },
};
