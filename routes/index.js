// Import required modules
const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);

// Handle wrong routes
router.use((req, res) => {
  res.status(404).send('Wrong route!');
});

// Export the router
module.exports = router;
