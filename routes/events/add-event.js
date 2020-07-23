const db = require('../../database');
const { validateFields } = require('../../lib/api');

module.exports = async (req, res) => {
  let errors = [];

  try {
    let { day, description, time } = req.body;
  
    day = parseInt(day);
    time = parseInt(time);

    errors = validateFields(day, description, time);

    if(errors.length) {
      throw new Error('Invalid data given');
    }

    const params = [time, description, day];

    const { rows: [event]} = await db.query(
      `insert into events 
        ("time", "description", "day")
        values ($1, $2, $3)
        returning *`,
      params
    );

    res.send(event);
  } catch(error) {
    let msg = 'Bad Request';

    if(errors.length) {
      msg = errors;
    }

    res.status(400).send({ error: msg });
  }
}
