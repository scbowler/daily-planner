import React from 'react';
import axios from 'axios';
import DayBtn from './day-btn';
import EventForm from './event-form';
import EventsTable from './events-table';
import ModalBtn from './modal-btn';
import { days } from '../lib/date';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDay: null,
      error: null,
      events: []
    }

    this.buildDays = this.buildDays.bind(this);
  }

  async getEvents(day) {
    const dayNum = days.indexOf(day);

    if(dayNum === -1) return;

    try {
      const { data: events } = await axios.get(`/api/events/${dayNum}`);

      this.setState({ events, error: null });
    } catch(error) {
      this.setState({ error: 'Error Loading Events' });
    }
  }

  setActiveDay(activeDay) {
    if(days.indexOf(activeDay) === -1) return;

    this.setState({ activeDay }, () => {
      this.getEvents(this.state.activeDay);
    });
  }

  buildDays() {
    const { activeDay } = this.state;
    return (
      <div className="row mb-5 d-flex justify-content-around">
        { 
          days.map(d => {
            return <DayBtn key={d} activeDay={activeDay} day={d} onClick={() => this.setActiveDay(d)} />
          })
        }
      </div>
    )
  }

  render() {
    console.log('State:', this.state);
    const { activeDay, events } = this.state;

    return (
      <div className="container-fluid">
        <EventForm />
        <h1 className="text-center my-5">Weekly Planner</h1>
        <this.buildDays />
        <div className="row py-5 justify-content-center">
          <ModalBtn btnClass="btn btn-xlg btn-light-blue" btnText="Add Event" />
        </div>
        <EventsTable day={activeDay} events={events} />
      </div>
    );
  }
}

export default App;
