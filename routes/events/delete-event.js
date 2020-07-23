const db = require('../../database');

module.exports = async (req, res) => {
  const { eventId } = req.params;

  try {
    const data = await db.query('delete from events where eventId=$1', [eventId]);

    console.log('Data:', data);

    res.send({
      deletedId: eventId
    });
  } catch (err) {
    res.status(400).send({ error: 'Bad Request' });
  }
}
