import React from 'react';
import { days } from '../../lib/date';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: days.indexOf(props.day),
      description: props.description || '',
      time: props.time
    }
  }

  render() {
    nearest15();

    return null;
  }
}

function nearest15() {
  const now = new Date();

  console.log('Minutes:', now.getMinutes());
  console.log('Hours:', now.getHours());
}

function TimeOptions(step = 15) {
  const times = [];
  let hour = 0;
  let minute = 0;
  let connector = '0';
  let time = '';
  while (hour < 24) {
    time = hour + connector + minute;
    times.push(
      <option value={time}>{time}</option>
    );
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
