const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,

  createReaction,
  deleteReaction
} = require('../../controllers/ThoughtsController.js');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/Thoughts/:ThoughtsId
router
  .route('/:ThoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

  router.route('/:ThoughtsId/reaction').post(createReaction);

  // /api/ThoughtsID/reaction/:reactionId
router.route('/:ThoughtsId/reaction/:reactionId').delete(deleteReaction);


module.exports = router;
