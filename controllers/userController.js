const { User, Thought } = require('../models');

module.exports = { 
    /* Get all users */ 
    async getUsers(req, res) { 
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Get user by id */
    async getUserById(req, res) {
        try { 
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user found with the requested ID.'});
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 

    /* Create a new user */
    async createUser(req, res) {
        try{ 
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Update a user by id */
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { 
                    new: true,
                    runValidators: true
                }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with the requested ID.'});
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Delete a user by id */
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found with the requested ID.'});
            }

            // Delete all associated Thoughts to the User
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Add a new friend to a user's friend list */
    async addFriend(req, res) {
        try { 
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $push: {friends: req.params.friendId} },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with the requested ID.'});
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Deletes an existing friend from a user's friend list */
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with the requested ID.'});
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}