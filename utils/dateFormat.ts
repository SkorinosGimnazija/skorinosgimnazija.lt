const ltDateFormat = new Intl.DateTimeFormat('lt-LT', {
  dateStyle: 'short',
  timeZone: 'Europe/Vilnius',
});

const ltDateTimeFormat = new Intl.DateTimeFormat('lt-LT', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Europe/Vilnius',
});

const ltEventDateFormat = new Intl.DateTimeFormat('lt-LT', {
  dateStyle: 'long',
  timeZone: 'Europe/Vilnius',
});

const ltEventDateTimeFormat = new Intl.DateTimeFormat('lt-LT', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Europe/Vilnius',
});

type LocalDate = {
  (date: null | undefined): null;
  (date: Date | string): string;
  (date: Date | string | null | undefined): string | null;
};

export const toLocalDate: LocalDate = (date?: Date | string | null) => {
  if (!date) {
    return null as any;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ltDateFormat.format(date);
};

export const toLocalDateTime: LocalDate = (date?: Date | string | null) => {
  if (!date) {
    return null as any;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ltDateTimeFormat.format(date);
};

export const toEventLocalDate: LocalDate = (date?: Date | string | null) => {
  if (!date) {
    return null as any;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const formated = ltEventDateFormat.format(date).slice(8);
  return formated[0].toUpperCase() + formated.slice(1);
};

export const toEventLocalDateTime: LocalDate = (date?: Date | string | null) => {
  if (!date) {
    return null as any;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const formated = ltEventDateTimeFormat.format(date).slice(8);
  return formated[0].toUpperCase() + formated.slice(1);
};