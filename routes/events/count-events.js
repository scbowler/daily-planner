const db = require('../../database');

module.exports = async (req, res) => {
  try {
    const { rows } = await db.query('select "day", count(*) from events group by "day"');

    const dayCount = [0, 0, 0, 0, 0, 0, 0];

    rows.forEach(({day, count}) => {
      dayCount[day] = parseInt(count);
    });

    res.send({ dayCount });
  } catch (err) {
    console.log('Count Error:', err);
    res.status(400).send({ error: 'Bad Request' });
  }
}
