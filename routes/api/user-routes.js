const { Router } = require('express').Router();
const router = require('express');
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