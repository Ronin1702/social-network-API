const { Thought, User } = require('../models');

const handleError = (err, res) => {
    console.error(err);
    res.status(500).json(err);
};

const thoughtCRUDs = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
            res.json(dbThoughtData);
        } catch (err) {
            handleError(err, res);
        }
    },

    // get a single thought by id
    async getThought(req, res) {
        try {
            const dbThoughtData = await Thought.findById(req.params.thoughtId);
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            handleError(err, res);
        }
    },

    // create a thought
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }
            res.json({ message: 'Thought successfully created!' });
        } catch (err) {
            handleError(err, res);
        }
    },

    // update thought
    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            handleError(err, res);
        }
    },

    // delete thought
    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            const dbUserData = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'Thought deleted but no user with this id!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            handleError(err, res);
        }
    },

    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            handleError(err, res);
        }
    },

    // remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            handleError(err, res);
        }
    },
};

module.exports = thoughtCRUDs;
