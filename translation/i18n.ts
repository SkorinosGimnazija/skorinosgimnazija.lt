interface Translation {
  [key: string]: {
    schoolName: string;
    schoolNameShort: string;
    schoolAdress: string;
    schoolPhone: string;
    schoolEmail: string;

    modified: string;
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
  },
  by: {
    schoolName: 'Віленская гімназія імя Францыска Скарыны',
    schoolNameShort: 'Гімназія імя Ф. Скарыны',
    schoolAdress: 'Вул. Сеціно, 21 Вільнюс LT-04316',
    schoolPhone: 'Tэл. / факс +370 5 245 9127',
    schoolEmail: 'rastine@skorinos.vilnius.lm.lt',

    modified: 'Абноўлена',
  },
  en: {
    schoolName: 'Vilnius Pranciskaus Skorinos Gymnasium',
    schoolNameShort: 'P. Skorinos Gymnasium',
    schoolAdress: 'Sietyno str. 21, Vilnius LT-04316',
    schoolPhone: 'Phone / fax +370 5 245 9127',
    schoolEmail: 'rastine@skorinos.vilnius.lm.lt',

    modified: 'Updated',
  },
};
