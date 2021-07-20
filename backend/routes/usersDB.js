const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { validateUserId, validateUserInfo } = require('../middlewares/celebrate');

const {
  getAllUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
  signOut,
} = require('../controllers/usersDB');

router.get('/users', getAllUsers);

router.get('/users/me', auth, getCurrentUser);

router.get('/users/:userId', validateUserId, getUserById);

router.patch('/users/me', validateUserInfo, updateUser);

router.patch('/users/me/avatar', validateUserInfo, updateAvatar);

router.post('/users/me/signout', signOut);

module.exports = router;
