const router = require('express').Router();
const courseRoutes = require('./ThoughtsRoutes');
const studentRoutes = require('./userRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
