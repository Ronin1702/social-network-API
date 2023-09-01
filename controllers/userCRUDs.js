const { User, Thought } = require('../models');

// Centralized error handling
const handleError = (err, res) => {
    console.log(err);
    if (err.name === 'ValidationError') {
        const messages = {};
        for (const field in err.errors) {
            if (err.errors[field].kind === 'minlength') {
                messages[field] = `${field} should be at least ${err.errors[field].properties.minlength} characters long.`;
            } else if (err.errors[field].kind === 'maxlength') {
                messages[field] = `${field} should be at most ${err.errors[field].properties.maxlength} characters long.`;
            } else {
                messages[field] = err.errors[field].message;
            }
        }
        return res.status(400).json({ errors: messages });
    }
    res.status(500).json(err);
};

const userCRUDs = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            res.json(users);
        } catch (err) {
            handleError(err, res);
        }
    },

    // Get single user by id
    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .select('-__v')
                .populate('friends')
                .populate('thoughts');

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            handleError(err, res);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            handleError(err, res);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(updatedUser);
        } catch (err) {
            handleError(err, res);
        }
    },

    // Delete user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            // await Thought.deleteMany({ _id: { $in: user.thoughts } });
            await User.updateMany(
                { friends: { $in: [user._id] } },
                { $pull: { friends: user._id } }
            );
            res.json({ message: 'Associated thoughts and friendship of the user successfully deleted!' });
        } catch (err) {
            handleError(err, res);
        }
    },

    // Add friend to friend list
    async addFriend(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(updatedUser);
        } catch (err) {
            handleError(err, res);
        }
    },

    // Remove friend from friend list
    async removeFriend(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(updatedUser);
        } catch (err) {
            handleError(err, res);
        }
    },
};

module.exports = userCRUDs;
