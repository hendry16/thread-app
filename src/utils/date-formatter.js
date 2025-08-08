import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const showFormattedDate = (date, locale) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(locale, options);
};

const showTimeAgo = (date) => formatDistanceToNow(new Date(date), { addSuffix: true, locale: id });

export { showFormattedDate, showTimeAgo };
