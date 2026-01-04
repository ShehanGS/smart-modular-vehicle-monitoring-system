export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString(undefined, { hour12: false });

export const formatNumber = (num?: number, digits = 1) =>
  num !== undefined ? Number(num).toFixed(digits) : '-';

export const classNames = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

