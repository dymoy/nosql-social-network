const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.status(404).send('<h3>404 Error! Route not found.</h3>');
});

module.exports = router;
