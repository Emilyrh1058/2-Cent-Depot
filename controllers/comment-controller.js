const { Comment, Cent } = require('../models');

const commentController = {
  // add comment to thought post
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Cent.findOneAndUpdate(
          { _id: params.CentId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbCentData => {
        if (!dbCentData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
        res.json(dbCentData);
      })
      .catch(err => res.json(err));
  },

  // add reply to comment
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId }, 
      { $push: { replies: body } }, 
      { new: true, runValidators: true })
      .then(dbCentData => {
        if (!dbCentData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
        res.json(dbCentData);
      })
      .catch(err => res.json(err));
  },

  // remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedComment => {
        if (!deletedComment) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return Cent.findOneAndUpdate(
          { _id: params.CentId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then(dbCentData => {
        if (!dbCentData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
        res.json(dbCentData);
      })
      .catch(err => res.json(err));
  },

  // remove reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbCentData => res.json(dbCentData))
      .catch(err => res.json(err));
  }
};

module.exports = commentController;