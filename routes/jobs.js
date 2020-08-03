const express = require("express");
const router = express.Router();
const {
	getJobs,
	newJob,
	getJobsInRadius,
    updateJob,
    deleteJob,getJob
} = require("../controllers/jobsController");

router.route("/jobs").get(getJobs);
router.route("/job/new").post(newJob);
router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);
router.route("/jobs/:id").put(updateJob);
router.route("/jobs/:id").delete(deleteJob);
router.route("/job/:id/:slug").get(getJob);


module.exports = router;
