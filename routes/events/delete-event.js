const db = require('../../database');

module.exports = async (req, res) => {
  const { eventId } = req.params;

  try {
    await db.query('delete from events where "eventId"=$1', [eventId]);

    res.send({
      deletedId: eventId
    });
  } catch (err) {
    res.status(400).send({ error: 'Bad Request' });
  }
}
