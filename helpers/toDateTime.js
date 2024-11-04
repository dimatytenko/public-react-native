import { format } from 'date-fns';

const toDateTime = (sec) => {
  var t = new Date(Date.UTC(1970, 0, 1));
  t.setUTCSeconds(sec);
  return format(t, 'dd/MM/yyyy | kk:mm');
};

export default toDateTime;
