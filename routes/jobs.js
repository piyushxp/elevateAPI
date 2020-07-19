const express = require('express');
const router = express.Router();
const { getJobs, newJob } = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/jobs/new').post(newJob);

module.exports = router;
