const router = require('express').Router();
const {

} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get()
    .post();

// /api/thoughts/:id
router
    .route('/:id')
    .get()
    .put()
    .delete();

module.exports = router;