import React from 'react';
import './day-btn.scss';

export default ({ activeDay, day, eventCount, onClick = null }) => (
  <div 
    className={`position-relative day col-1 bg-light-blue text-center py-4 ${activeDay === day ? 'active' : ''}`}
    onClick={onClick}>
      <div>{day}</div>
      <div className=" event-count">{eventCount} Event{eventCount === 1 ? '' : 's'}</div>
  </div>
);
