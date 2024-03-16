const router = require('express').Router();
const userRoutes = require('./userRoutes');
// TODO: require thoughtRoutes

router.use('/users', userRoutes);
// TODO: establish path for thoughtRoutes

module.exports = router;
