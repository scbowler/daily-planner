const db = require('../../database');

module.exports = async (req, res) => {
  const { rows } = await db.query('select * from events');

  const events = rows.map(event => {
    const d = new Date(event.date);

    event.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    return event;
  });

  res.send([...events]);
}
