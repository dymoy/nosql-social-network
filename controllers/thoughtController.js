/**
 * @file thoughtController.js
 * Implements the logic for thought API routes and functions 
 * Supported methods: 
 *  - getThoughts: returns all existing Thought documents in the collection 
 *  - getThoughtById: returns a single Thought document by id 
 *  - createThought: creates an instance of the Thought model using the data in req.body 
 *  - updateThought: updates an existing Thought with the req.body
 *  - deleteThought: deletes an existing Thought from the collection
 *  - addReaction: creates an instance of the Reaction schema to the associated Thought 
 *  - deleteReaction: deletes an existing reaction subdocument from the associated Thought
 */
const { User, Thought } = require ('../models');

module.exports = { 
    /* Get all thoughts */ 
    async getThoughts(req, res) { 
        try {
            // Find all Thought documents in the collection
            const thoughts = await Thought.find({})
                // populate with the associated reactions 
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
            // Find the requested Thought document with the thoughtId provided 
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
            // Create an instance of Thought using the req.body data 
            const thought = await Thought.create(req.body);

            // Find and update the User that created the Thought
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
            // Find the Thought document by ID and update the data using req.body 
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true }
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
            // Delete the thought document from the collection 
            const thought = await Thought.findOneAndDelete( {_id: req.params.thoughtId} );

            if (!thought) {
                res.status(404).json({message: 'No thought found with the requested ID.'});
            }

            // Find the user that created the thought and remove it from the array of subdocuments
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
            // Find the Thought document and push the reaction to to the reactions array 
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
            res.status(500).json(err);
        }
    },
    
    /* Pull and remove a reaction by the reaction's reactionId value */
    async deleteReaction(req, res) {
        try {
            // Find the Thought document and pull the deleted reaction out of the reactions array
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
            res.status(500).json(err);
        }
    }
}
