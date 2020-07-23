export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export function buildTimeArray(step = 15) {
  const times = [];
  let hour = 0;
  let minute = 0;
  let connector = '0';
  let time = '';
  while (hour < 24) {
    time = hour + connector + minute;
    times.push(time);
    minute += step;
    connector = '';
    if (minute >= 60) {
      minute = 0;
      hour++;
      connector = '0';
    }
  }
  return times;
}
