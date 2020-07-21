const router = require('express').Router();
const eventsRoutes = require('./events');

router.use('/api/events', eventsRoutes);

module.exports = router;
