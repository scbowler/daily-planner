const db = require('../../database');
const { days } = require('../../lib/date');

module.exports = async (req, res) => {
  const { day } = req.params;
  const error = 'Bad Request';

  try {
    if(isNaN(day) || day < 0 || day > 6) {
      error = 'Invalid day provided';
      throw new Error(error);
    }
    const { rows } = await db.query('select * from events where day = $1', [day]);

    const events = rows.map(event => {
      event.dayText = days[event.day];
      return event;
    });

    res.send([...events]);
  } catch(err) {
    res.status(400).send({ error });
  }
}
