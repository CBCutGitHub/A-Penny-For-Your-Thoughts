const router = require('express').Router();
const ThoughtsRoutes = require('./ThoughtsRoutes');
const UserRoutes = require('./userRoutes');

router.use('/Thoughts', ThoughtsRoutes);
router.use('/User', UserRoutes);

module.exports = router;
