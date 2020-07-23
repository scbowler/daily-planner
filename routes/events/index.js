const router = require('express').Router();
const addEvent = require('./add-event');
const deleteEvent = require('./delete-event');
const getEvents = require('./get-events');
const updateEvent = require('./update-event');

router.delete('/:eventId', deleteEvent);
router.get('/:day', getEvents);
router.post('/', addEvent);
router.put('/:eventId', updateEvent);

module.exports = router;
