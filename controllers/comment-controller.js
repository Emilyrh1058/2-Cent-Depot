const { User, Reaction, } = require('../models');

const reactionController = {
  // add reaction to thought post
  addReaction({ params, body }, res) {
    console.log(body);
    Reaction.create(body)
      .then(({ _id }) => {
        return Reaction.findOneAndUpdate(
          { _id: params.ReactionId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbusertData => {
        if (!dusertData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(err => res.json(err));
  },

  // add reaction to user post
  addReaction({ params, body }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.reactiontId }, 
      { $push: { replies: body } }, 
      { new: true, runValidators: true })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactiontId })
      .then(deletedReaction => {
        if (!deletedReaction) {
          return res.status(404).json({ message: 'No Reaction with this id!' });
        }
        return Cent.findOneAndUpdate(
          { _id: params.UserId },
          { $pull: { reaction: params.reactionId } },
          { new: true }
        );
      })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbpostData);
      })
      .catch(err => res.json(err));
  },

  // remove reply
  removeReaction({ params }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.reactionId },
      { $pull: { replies: { reactionId: params.replyId } } },
      { new: true }
    )
      .then(duserData => res.json(dbuserData))
      .catch(err => res.json(err));
  }
};

module.exports = reactionController;