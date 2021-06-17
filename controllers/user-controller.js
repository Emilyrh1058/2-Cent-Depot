const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
    .then(dbuserData => res.json(dbuserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  // get one user by id
  getUsertById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No User found with this id!'});
          return;
        }
        res.json(dbuserData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then(dbuserData => res.json(dbuserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbusertData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(err => res.status(400).json(err));
  }
}


module.exports = userController;