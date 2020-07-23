const router = require('express').Router();
const addEvent = require('./add-event');
const getEvents = require('./get-events');
const updateEvent = require('./update-event');

router.get('/:day', getEvents);
router.post('/', addEvent);
router.put('/:eventId', updateEvent);

module.exports = router;
