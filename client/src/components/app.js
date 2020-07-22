import React from 'react';
import DayBtn from './day-btn';
import EventsTable from './events-table';
import { days } from '../lib/date';

class App extends React.Component {
  buildDays() {
    return (
      <div className="row mb-5 d-flex justify-content-around">
        { 
          days.map(d => {
            return <DayBtn key={d} day={d} />
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="text-center my-5">Weekly Planner</h1>
        <this.buildDays />
        <EventsTable />
      </div>
    );
  }
}

export default App;
