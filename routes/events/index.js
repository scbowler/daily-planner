const router = require('express').Router();
const addEvent = require('./add-event');
const getEvents = require('./get-events');

router.get('/:day', getEvents);
router.post('/', addEvent);

module.exports = router;
