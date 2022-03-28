interface Translation {
  [key: string]: {
    name: string;
    nameShort: string;
    address: string;
    phone: string;
    email: string;

    modified: string;
  };
}

export const translation: Translation = {
  lt: {
    name: 'Vilniaus Pranciškaus Skorinos gimnazija',
    nameShort: 'P. Skorinos Gimnazija',
    address: 'Sietyno g. 21, Vilnius LT-04316',
    phone: 'Tel. / faksas +370 5 245 9127',
    email: 'rastine@skorinos.vilnius.lm.lt',

    modified: 'Atnaujinta',
  },
  by: {
    name: 'Віленская гімназія імя Францыска Скарыны',
    nameShort: 'Гімназія імя Ф. Скарыны',
    address: 'Вул. Сеціно, 21 Вільнюс LT-04316',
    phone: 'Tэл. / факс +370 5 245 9127',
    email: 'rastine@skorinos.vilnius.lm.lt',

    modified: 'Абноўлена',
  },
  en: {
    name: 'Vilnius Pranciskaus Skorinos Gymnasium',
    nameShort: 'P. Skorinos Gymnasium',
    address: 'Sietyno str. 21, Vilnius LT-04316',
    phone: 'Phone / fax +370 5 245 9127',
    email: 'rastine@skorinos.vilnius.lm.lt',

    modified: 'Updated',
  },
};
