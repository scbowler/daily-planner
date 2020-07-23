const db = require('../../database');

module.exports = async (req, res) => {
  let errors = [];

  try {
    let { day, description, time } = req.body;
  
    day = parseInt(day);
    time = parseInt(time);

    if(isNaN(day) || day < 0 || day > 6) {
      errors.push('Invalid day given');
    }
    if(!description) {
      errors.push('No description given');
    }
    if(isNaN(time) || time < 0 || time >= 2400) {
      errors.push('Invalid time given');
    }

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
    console.log('Error:', error);
    let msg = 'Bad Request';

    if(errors.length) {
      msg = errors;
    }

    res.status(400).send({ error: msg });
  }
}
