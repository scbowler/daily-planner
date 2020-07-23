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

function BuildRows({events = null, day, minRows = 8, update}) {
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
                  btnClass="btn btn-light-blue"
                  btnText="Update Event"
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
              </td>
            </tr>
          );
        })
      }
      <BlankRows count={blankCount} />
    </>
  )
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
