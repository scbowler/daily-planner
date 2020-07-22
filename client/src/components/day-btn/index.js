import React from 'react';
import './day-btn.scss';

export default ({ activeDay, day, onClick = null }) => (
  <div className={`day col-1 bg-light-blue text-center py-5 ${activeDay === day ? 'active' : ''}`} onClick={onClick}>{day}</div>
);
