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

    this.addEvent = this.addEvent.bind(this);
    this.buildDays = this.buildDays.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  async addEvent(event, cb) {
    try {
      const { data: newEvent } = await axios.post('/api/events', event);

      cb();

      const dayEventAdded = days[newEvent.day];
      const { activeDay } = this.state;

      if(dayEventAdded === activeDay) {
        this.getEvents(activeDay);
      }
    } catch(error) {
      console.log('Add error:', error);
    }
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

  async updateEvent(event, cb) {
    try {
      const { eventId, ...newEvent } = event;
      const { data: updatedEvent } = await axios.put(`/api/events/${eventId}`, newEvent);

      cb();

      const dayEventAdded = days[updatedEvent.day];
      const { activeDay, events } = this.state;

      if (dayEventAdded === activeDay) {
        this.getEvents(activeDay);
      } else {
        const eventIndex = events.findIndex(({eventId}) => eventId === updatedEvent.eventId);
        const updatedEvents = [...events];

        updatedEvents.splice(eventIndex, 1);
        this.setState({
          events: updatedEvents
        });
      }
    } catch(error) {
      console.log('Update Error:', error);
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
    const { activeDay, events } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="text-center my-5">Weekly Planner</h1>
        <this.buildDays />
        <div className="row py-5 justify-content-center">
          <ModalBtn 
            btnClass="btn btn-xlg btn-light-blue"
            btnText="Add Event"
            Content={EventForm}
            contentProps={{ 
              day: activeDay,
              submit: this.addEvent,
              submitTxt: 'Add Event',
              title:"Add Event" 
            }}
          />
        </div>
        <EventsTable day={activeDay} events={events} update={this.updateEvent} />
      </div>
    );
  }
}

export default App;
