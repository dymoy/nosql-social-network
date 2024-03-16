const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

/**
 * @route /api/thoughts
 * Establishes the route for getThoughts and createThought
 */
router.route('/').get(getThoughts).post(createThought);

/**
 * @route /api/thoughts/:thoughtId
 * Establishes the route for getThoughtById, updateThought, and deleteThought
 */
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

/**
 * @route /api/thoughts/:thoughtId/reactions
 */
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;
