const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // create User
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    //  get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '__v'
            })
            // .populate({
            //     path: 'friends',
            //     select: '__v'
            // })
            .select('-__v')
            .then((dbUserData) => {
                console.log(dbUserData)
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        },
    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
      // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //  add friend to user
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },
    //  delete friend from user
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId} },
            { new: true, runValidators: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;