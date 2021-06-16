const { Cent } = require('../models');

const centController = {
  // get all posts
  getAllPosts(req, res) {
    Cent.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbpostData => res.json(dbpostData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one post by id
  getPostById({ params }, res) {
    Cent.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbpostData => res.json(dbpostData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create Post
  createPost({ body }, res) {
    Cent.create(body)
      .then(dbpostData => res.json(dbpostData))
      .catch(err => res.json(err));
  },

  // update post by id
  updatePost({ params, body }, res) {
    Cent.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbpostData => {
        if (!dbpostData) {
          res.status(404).json({ message: 'No Post found with this id!' });
          return;
        }
        res.json(dbpostData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete Post
  deletePost({ params }, res) {
    Cent.findOneAndDelete({ _id: params.id })
      .then(dbpostData => res.json(dbpostData))
      .catch(err => res.json(err));
  }
};

module.exports = centController;