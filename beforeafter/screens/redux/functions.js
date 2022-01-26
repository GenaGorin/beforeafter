import moment from 'moment';

export function getDiffDate(date) {
  let now = moment();
  let momDate = moment(date);
  let diff = now.diff(momDate, 'days');
  let res;
  switch (true) {
    case diff <= 7:
      res = diff + 'д. назад';
      break;
    case diff > 7 && diff <= 31:
      res = Math.round(diff / 7) + 'нед. назад';
      break;
    case diff > 31 && diff <= 366:
      res = Math.round(diff / 30) + 'мес. назад';
      break;
    case diff > 366:
      res = Math.round(diff / 365) + 'г. назад';
      break;
    default:
      res = diff + 'д. назад';
  }
  return res;
}
