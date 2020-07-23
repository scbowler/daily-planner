const db = require('../../database');
const { validateFields } = require('../../lib/api');

module.exports = async (req, res) => {
  let errors = [];

  try {
    const { eventId } = req.params;
    let { day, description, time } = req.body;

    day = parseInt(day);
    time = parseInt(time);

    errors = validateFields(day, description, time);

    if (errors.length) {
      throw new Error('Invalid data given');
    }

    const params = [time, description, day, eventId];

    const { rows: [event] } = await db.query(
      `update events set
        "time"=$1,
        "description"=$2,
        "day"=$3
        where "eventId"=$4
        returning *`,
      params
    );

    res.send(event);
  } catch (error) {
    console.log('Error:', error);
    let msg = 'Bad Request';

    if (errors.length) {
      msg = errors;
    }

    res.status(400).send({ error: msg });
  }
}
