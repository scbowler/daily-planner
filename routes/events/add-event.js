const db = require('../../database');

module.exports = async (req, res) => {
  try {
    const params = [1030, 'This is a test event', '2020-09-07'];

    const result = await db.query(
      'insert into events ("time", "description", "date") values ($1, $2, $3)',
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
