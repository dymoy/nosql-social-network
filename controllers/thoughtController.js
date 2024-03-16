const { User, Thought } = require ('../models');

module.exports = { 
    /* Get all thoughts */ 
    async getThoughts(req, res) { 
        try {
            const thoughts = await Thought.find({})
                .populate({
                    path: 'reactions',
                    select: '-__v',
                    options: { sort: { 'createdAt': -1 } }
                })
                .select('-__v')
                .sort({ createdAt: -1 });

            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Get thought by id */
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne( {_id: req.params.thoughtId} )
                .populate({
                    path: 'reactions',
                    select: '-__v',
                    options: { sort: { 'createdAt': -1 } }
                })
                .select('-__v')
                .sort({ createdAt: -1 });

            if (!thought) {
                res.status(404).json({message: 'No thought found with the requested ID.'});
            }

            res.status(200).json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Create a thought */
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id }},
                { new: true }
            );

            if (!user) {
                res.status(404).json({message: 'No user found with the requested ID'});
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Update a thought */
    async updateThought(req, res) { 
        try { 
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!thought) {
                res.status(404).json({message: 'No thought found with the requested ID.'});
            }

            res.status(200).json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Delete a thought */
    async deleteThought(req, res) {
        try { 
            // Delete the thought 
            const thought = await Thought.findOneAndDelete( {_id: req.params.thoughtId} );

            if (!thought) {
                res.status(404).json({message: 'No thought found with the requested ID.'});
            }

            // Find the user that created the thought and remove it from the array
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true } 
            );

            if (!user) {
                res.status(404).json({message: 'No user found with the requested ID'});
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /* Create a reaction stored in a single thought's reactions array field */ 
    async addReaction(req, res) {
        try { 
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );
            
            if (!thought) {
                res.status(404).json({message: 'No thought found with the requested ID.'});
            }

            res.status(200).json(thought);
        } catch (err) { 
            res.status(500).json({
                error: err,
                message: 'Error adding Reaction.'
            });
        }
    },
    
    /* Pull and remove a reaction by the reaction's reactionId value */
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { 
                    reactions: {
                        _id: req.params.reactionId
                    }
                }},
                { new: true}
            );

            if (!thought) {
                res.status(404).json({message: 'No thought found with the requested ID.'});
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json({
                error: err,
                message: 'Error deleting Reaction.'
            });
        }
    }
}