const { Thought, User } = require('../models');

// Centralized error handling function
const handleError = (err, res) => {
    console.error(err);
    res.status(500).json(err);
};

const thoughtCRUDs = {
    // Get all thoughts sorted by createdAt in descending order
    async getThoughts(req, res) {
        try {
            const allThoughts = await Thought.find().sort({ createdAt: -1 });
            res.json(allThoughts);
        } catch (err) {
            handleError(err, res);
        }
    },

    // get a single thought by id
    async getThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            handleError(err, res);
        }
    },

    // Create a new thought and associate it with a user
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: newThought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }
            res.json({ message: 'Thought successfully created!' });
        } catch (err) {
            handleError(err, res);
        }
    },

    // Update an existing thought by its ID
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(updatedThought);
        } catch (err) {
            handleError(err, res);
        }
    },

    // Delete a thought by its ID
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Thought deleted but no user with this id!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            handleError(err, res);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(updatedThought);
        } catch (err) {
            handleError(err, res);
        }
    },

    // Remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(updatedThought);
        } catch (err) {
            handleError(err, res);
        }
    }
};

module.exports = thoughtCRUDs;
