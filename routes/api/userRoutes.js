const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/UserController');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/user/:userId/friend
router.route('/:userId/friend').post(addFriend);

// /api/userID/friend/:friendId
router.route('/:userId/friend/:friendId').delete(removeFriend);

module.exports = router;
