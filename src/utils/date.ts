import { format, parseISO } from 'date-fns';

export const formatDate = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM d, yyyy');
};

export const formatTime = (time: string) => {
  return format(parseISO(`2000-01-01T${time}`), 'h:mm a');
};

export const formatDateTime = (date: string, time: string) => {
  return `${formatDate(date)} at ${formatTime(time)}`;
};
