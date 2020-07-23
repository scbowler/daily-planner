const db = require('../../database');
const { days, padTime } = require('../../lib/date');

module.exports = async (req, res) => {
  const { day } = req.params;
  const error = 'Bad Request';

  try {
    if(isNaN(day) || day < 0 || day > 6) {
      error = 'Invalid day provided';
      throw new Error(error);
    }
    const { rows } = await db.query('select * from events where day = $1 order by "time"', [day]);

    const events = rows.map(event => {
      event.dayText = days[event.day];
      event.time = padTime(event.time);
      return event;
    });

    res.send([...events]);
  } catch(err) {
    res.status(400).send({ error });
  }
}
