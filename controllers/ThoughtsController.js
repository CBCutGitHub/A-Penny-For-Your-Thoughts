const { Thoughts, User } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single Thoughts
  getSingleThoughts(req, res) {
    Thoughts.findOne({ _id: req.params.ThoughtsId })
      .select('-__v')
  //we added populate on user line 19-20
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new Thoughts
  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) =>{
        User.findOneAndUpdate(
          {_id:req.body.userId},
        {$push:{thoughts: thoughts._id}},
        {new: true}
        )
        }).then(thoughts=>{
          res.json(thoughts)
        })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.ThoughtsId })
      .then((Thoughts) =>
    User.findOneAndUpdate(
      {thoughts: req.params.ThoughtsId},
      {$pull: {thoughts:req.params.ThoughtsId}},
      {new: true}
      )
      )
      //  .then(() => res.json({ message: 'Course and students deleted!' }))
      .then(() => res.json({ message: 'Thoughts and user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thoughts
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.ThoughtsId },
      { $set: req.body },
//Are we keeping the runValidator?
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No Thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

createReaction(req, res) {
  Thoughts.findOneAndUpdate(
    { _id: req.params.ThoughtsId },
    { $addToSet: { reaction: req.body } },
    { runValidators: true, new: true }
  )
    .then((thoughts) => {
      res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
// delete reaction from a thought
deleteReaction(req, res) {
  Thoughts.findOneAndUpdate(
    { _id: req.params.ThoughtsId },
    { $pull: { reaction: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((reactions) => {
      res.json(reactions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}}