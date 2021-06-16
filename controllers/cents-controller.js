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
      .then(dbCentData => res.json(dbCentData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one post by id
  getCentById({ params }, res) {
    Cent.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbCentData => res.json(dbCentData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create Cent
  createCent({ body }, res) {
    Cent.create(body)
      .then(dbCentData => res.json(dbCentData))
      .catch(err => res.json(err));
  },

  // update cent by id
  updateCent({ params, body }, res) {
    Cent.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbCentData => {
        if (!dbCentData) {
          res.status(404).json({ message: 'No Cent found with this id!' });
          return;
        }
        res.json(dbCentData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete Cent
  deleteCent({ params }, res) {
    Cent.findOneAndDelete({ _id: params.id })
      .then(dbCentData => res.json(dbCentData))
      .catch(err => res.json(err));
  }
};

module.exports = centController;