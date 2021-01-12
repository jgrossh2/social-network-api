const router = require('express');
const thoughtRoutes= require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router