export const formatExtendedDateTime = (dateTimeValue) => {
  if (!dateTimeValue) return '';

  const date = new Date(dateTimeValue);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
};

export const formatDateTime = (dateTimeValue) => {
  if (!dateTimeValue) return '';

  const date = new Date(dateTimeValue);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const formatCompactDateTime = (dateTimeValue) => {
  if (!dateTimeValue) return '';

  const date = new Date(dateTimeValue);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const parseRemValue = (value) => {
  const parsedValue = parseFloat(String(value ?? '0rem').replace('rem', ''));
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
};

export const roundParseFloat = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? +parsed.toFixed(2) : fallback;
};

export const roundMathMax = (...values) => {
  const max = Math.max(...values);
  return +Number(max.toFixed(2));
};
