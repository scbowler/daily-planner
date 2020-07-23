import React, { Fragment } from 'react';
import EventForm from '../event-form';
import ModalBtn from '../modal-btn';
import './events-table.scss';

export default (props) => {
  return (
    <table className="table events-table">
      <thead className="thead-dark">
        <tr>
          <th>Time</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <BuildRows {...props} />
      </tbody>
    </table>
  );
}

function BuildRows({events = null, day, deleteEvent, minRows = 6, update}) {
  let blankCount = minRows - 1;

  if(!day) {
    return (
      <>
        <tr>
          <td className="text-center" colSpan="3">Select a day to view events</td>
        </tr>
        <BlankRows count={blankCount}/>
      </>
    );
  }

  if(!events?.length) {
    return (
      <>
        <tr>
          <td className="text-center" colSpan="3">No events scheduled for {day}</td>
        </tr>
        <BlankRows count={blankCount} />
      </>
    );
  }

  blankCount = events.length >= minRows ? 0 : minRows - events.length;

  return (
    <>
      {
        events.map(({ eventId, description, time }) => {
          return (
            <tr key={eventId}>
              <td>{time}</td>
              <td>{description}</td>
              <td>
                <ModalBtn
                  btnClass="btn btn-light-blue mr-3"
                  btnText={< i className="fas fa-pen" />}
                  Content={EventForm}
                  contentProps={{
                    day,
                    description,
                    eventId,
                    submit: update,
                    submitTxt: 'Update Event',
                    time,
                    title: "Update Event"
                  }}
                />
                <ModalBtn
                  btnClass="btn btn-light-red"
                  btnText={< i className="fas fa-trash"/>}
                  Content={DeleteContent}
                  contentProps={{
                    day,
                    description,
                    eventId,
                    onDelete: deleteEvent,
                    time
                  }}
                />
              </td>
            </tr>
          );
        })
      }
      <BlankRows count={blankCount} />
    </>
  )
}

function DeleteContent({closeModal, day, description, eventId, time, onDelete}) {
  return (
    <>
      <h1 className="mb-4">Are you sure you want to delete this event?</h1>
      <table className="table events-table">
        <thead className="thead-dark event-confirm">
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{day}</td>
            <td>{time}</td>
            <td>{description}</td>
          </tr>
        </tbody>
      </table>
      <div className="my-4 text-center">
        <button className="btn btn-danger mr-3" onClick={closeModal}>Cancel</button>
        <button className="btn btn-success" onClick={() => onDelete(eventId, closeModal)}>Delete</button>
      </div>
    </>
  );
}

function BlankRows({count = 0}) {
  const rows = [];
  while(count--) {
    rows.push(
      <tr key={`blank-${count}`}>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }
  return rows;
}
