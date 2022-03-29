const ltDateFormat = new Intl.DateTimeFormat('lt-LT', {
  dateStyle: 'short',
});

const ltDateTimeFormat = new Intl.DateTimeFormat('lt-LT', {
  dateStyle: 'short',
  timeStyle: 'short',
});

const ltEventDateFormat = new Intl.DateTimeFormat('lt-LT', {
  dateStyle: 'long',
});

const ltEventDateTimeFormat = new Intl.DateTimeFormat('lt-LT', {
  dateStyle: 'long',
  timeStyle: 'short',
});

type LocalDate = {
  (date: null | undefined): null;
  (date: Date | string): Date;
  (date: Date | string | null | undefined): Date | null;
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

  return ltEventDateFormat.format(date).substring(8);
};

export const toEventLocalDateTime: LocalDate = (date?: Date | string | null) => {
  if (!date) {
    return null as any;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ltEventDateTimeFormat.format(date).substring(8);
};
