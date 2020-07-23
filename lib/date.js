exports.days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

exports.padTime = time => {
  let pad = '';

  if(time < 1000) {
    pad += '0';
  }
  if(time < 100) {
    pad += '0';
  }
  if(time < 10) {
    pad += '0'
  }

  return pad + '' + time;
}
