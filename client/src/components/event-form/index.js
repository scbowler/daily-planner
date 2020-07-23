import React from 'react';
import { buildTimeArray, days } from '../../lib/date';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: days.indexOf(props.day),
      description: props.description || '',
      eventId: props.eventId || null,
      time: props.time || nearest15()
    }

    this.times = buildTimeArray();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    await this.props.submit({ ...this.state }, this.props.closeModal);
  }

  handleChange({ target: { value, name }}) {
    this.setState({
      [name]: value
    });
  }

  render() {
    const { day, description, time } = this.state;
    const { closeModal, submitTxt, title } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="text-center">{title}</h1>
        <div className="row justify-content-center mb-4">
          <div className="col-4">
            <label>Day:</label>
            <select className="custom-select custom-select-lg" name="day" value={day} onChange={this.handleChange}>
              <option value="-1" disabled>Choose a Day</option>
              <DayOptions days={days}/>
            </select>
          </div>
          <div className="col-4">
            <label>Time:</label>
            <select className="custom-select custom-select-lg" name="time" value={time} onChange={this.handleChange}>
              <option value="default" disabled>Choose a Time</option>
              <TimeOptions times={this.times}/>
            </select>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-8">
            <label>Event Description:</label>
            <textarea className="form-control" name="description" rows="4" value={description} onChange={this.handleChange}>Event Description</textarea>
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-8 text-right">
            <button className="btn btn-lg btn-danger mr-3" onClick={closeModal} type="button">Cancel</button>
            <button className="btn btn-lg btn-success">{submitTxt}</button>
          </div>
        </div>
      </form>
    );
  }
}

function nearest15() {
  const now = new Date();

  let minutes = now.getMinutes();
  let hours = now.getHours(); 
  
  if(minutes <= 15) {
    minutes = 15;
  } else if(minutes <= 30) {
    minutes = 30;
  } else if(minutes <= 45) {
    minutes = 45;
  } else {
    minutes = '00';
    hours++;
  }

  return hours + '' + minutes;
}

function DayOptions({ days }) {
  return days.map((d, i) => (
    <option key={d} value={i}>{d}</option>
  ));
}

function TimeOptions({ times }) {
  return times.map(t => (
  <option key={t} value={t}>{t}</option>
  ));
}
