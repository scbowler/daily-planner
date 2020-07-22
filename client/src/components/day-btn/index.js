import React from 'react';
import './day-btn.scss';

export default ({ day, onClick = null }) => (
  <div className="day col-1 bg-light-blue text-center py-5" onClick={() => onClick(day)}>{day}</div>
);
