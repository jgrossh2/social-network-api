const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate(
                {
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // create thought
    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    //  get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '__v'
            })
            .select('-__v')
            .then((dbThoughtData) => {
                console.log(dbThoughtData)
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        },
    // update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with that id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
      // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    // add reaction to thought
    createReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .populate({
                path: "reactions",
                select: '__v'
            })
            .select('__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        },
    //  delete reaction to thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId } } },
            { new: true }
            )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
        }
};

module.exports = thoughtController;