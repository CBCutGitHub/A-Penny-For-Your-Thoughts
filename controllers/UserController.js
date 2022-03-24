const { User, Thoughts } = require('../models');

module.exports = {
  // Get all user
  getUser(req, res) {
    User.find()
      .then(user => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleuUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate("friends")
      .populate("thoughts")
      .then(user =>
{
  res.json(user)
}       )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and delete them from the thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>{
 
       return Thoughts.deleteMany(
             {
              _id: {
                $in: user.thoughts
              }
              
             }
       )
      }
          )
      .then((thoughts) =>

          res.json({ message: 'User successfully deleted'})
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an friend to a user
  addFriend(req, res) {
      User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
    
    )
      .then((friend) =>
    res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
    //Did a ctl+z; not sure if a change
      res.json(friendstudent)
      )
      .catch((err) => res.status(500).json(err));
  },
};
