const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

/**
 * @route /api/users
 * Establishes the route for getUsers and createUser
 */
router.route('/').get(getUsers).post(createUser);

/**
 * @route /api/users/:userId
 * Establishes the route for getUserById, updateUser, and deleteUser
 */
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

/**
 * @route /api/users/:userId/friends/:friendId
 * Establishes the route for addFriend and deleteFriend
 */
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
