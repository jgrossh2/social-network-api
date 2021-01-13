const router = require('express').Router();
const {
    getAllUser,
    createUser,
    updateUser
} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get()
    .put(updateUser)
    .delete();

module.exports = router;