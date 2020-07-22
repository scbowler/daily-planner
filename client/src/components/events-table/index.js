import React from 'react';

export default ({events}) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <th>Time</th>
        <th>Description</th>
      </thead>
      <tbody>
        <BuildRows events={events} />
      </tbody>
    </table>
  );
}

function BuildRows({events = null}) {
  if(!events?.length) {
    return (
      <tr>
        <td className="text-center" colSpan="2">No Events for Selected Day</td>
      </tr>
    );
  }

  return events.map(({time, description}) => {
    return (
      <tr>
        <td>{time}</td>
        <td>{description}</td>
      </tr>
    );
  });
}
