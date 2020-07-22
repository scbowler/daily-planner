const db = require('../../database');

module.exports = async (req, res) => {
  try {
    const params = [1030, 'This is a test event', Math.floor(Math.random() * 7)];

    const result = await db.query(
      'insert into events ("time", "description", "day") values ($1, $2, $3)',
      params
    );

    console.log('Query Result:', result);

    res.send({
      msg: 'Test insert'
    });
  } catch(error) {
    res.status(400).send({ error: error.message });
  }
}
