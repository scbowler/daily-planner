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
      dayCount: new Array(7).fill(0),
      error: null,
      events: []
    }

    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.buildDays = this.buildDays.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  componentDidMount() {
    const { day = null } = this.props.match.params;
    this.getDayCount();

    if(day) {
      this.getEvents(day);
    }
  }

  componentDidUpdate(prevProps) {
    const { day = null } = this.props.match.params;
    
    if(day && day !== prevProps.match.params.day) {
      this.getEvents(day);
    }
  }

  async addEvent(event, cb) {
    try {
      const { data: newEvent } = await axios.post('/api/events', event);

      cb();

      const dayEventAdded = days[newEvent.day];
      const { day } = this.props.match.params;

      if(dayEventAdded === day) {
        this.getEvents(day);
      }

      this.updateCount(newEvent.day);
    } catch(error) {
      console.log('Add error:', error);
    }
  }

  async deleteEvent(id, day, cb) {
    try {
      let { data: { deletedId } } = await axios.delete(`/api/events/${id}`);
      deletedId = parseInt(deletedId);

      cb();

      const { events } = this.state;
      const eventIndex = events.findIndex(({ eventId }) => eventId === deletedId);
      
      if (eventIndex > -1) {
        const updatedEvents = [...events];

        updatedEvents.splice(eventIndex, 1);
        this.setState({
          events: updatedEvents
        });
      }
      this.updateCount(days.indexOf(day), '-');
    } catch(error) {
      console.log('Delete Error:', error);
    }
  }

  async getDayCount() {
    const { data: { dayCount }} = await axios.get('/api/events/count');

    this.setState({ dayCount });
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

  updateCount(dayIndex, op = '+') {
    const { dayCount } = this.state;
    const count = [...dayCount];

    dayIndex = parseInt(dayIndex);
    
    if(op === '+') {
      count[dayIndex]++;
    } else {
      count[dayIndex]--;
    }
    
    this.setState({ dayCount: count });
  }

  async updateEvent(event, cb) {
    try {
      const { eventId, ...newEvent } = event;
      const { data: updatedEvent } = await axios.put(`/api/events/${eventId}`, newEvent);

      cb();

      const dayEventAdded = days[updatedEvent.day];
      const { day } = this.props.match.params;
      const { events } = this.state;

      if (dayEventAdded === day) {
        this.getEvents(day);
      } else {
        const eventIndex = events.findIndex(({eventId}) => eventId === updatedEvent.eventId);
        const updatedEvents = [...events];

        this.updateCount(events[eventIndex].day, '-');
        this.updateCount(updatedEvent.day);

        updatedEvents.splice(eventIndex, 1);
        this.setState({
          events: updatedEvents
        });
      }
    } catch(error) {
      console.log('Update Error:', error);
    }
  }

  buildDays() {
    const { day } = this.props.match.params;
    const { dayCount } = this.state;

    return (
      <div className="row mb-3 d-flex justify-content-around">
        { 
          days.map((d, i) => {
            return <DayBtn key={d} activeDay={day} day={d} eventCount={dayCount[i]} onClick={() => this.props.history.push(`/${d}`)} />
          })
        }
      </div>
    )
  }

  render() {
    const { day } = this.props.match.params;
    const { events } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="text-center text-black-50 my-4">Weekly Planner</h1>
        <this.buildDays />
        <div className="row py-5 justify-content-center">
          <ModalBtn 
            btnClass="btn btn-xlg btn-light-blue"
            btnText="Add Event"
            Content={EventForm}
            contentProps={{ 
              day: day,
              submit: this.addEvent,
              submitTxt: 'Add Event',
              title:"Add Event" 
            }}
          />
        </div>
        <h2 className="text-center text-black-50">{day ? `${day}'s Scheduled Events` : 'Select Day Above'}</h2>
        <EventsTable
          day={day}
          deleteEvent={this.deleteEvent}
          events={events}
          update={this.updateEvent}
        />
      </div>
    );
  }
}

export default App;
