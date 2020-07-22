const Job = require("../models/jobs");
const geoCoder = require("../utils/geocoder");

exports.getJobs = async (req, res) => {
	const allJobs = await Job.find();
	res.status(200).json({ count: allJobs.length, success: true, data: allJobs });
};

//Create a new job = api/v1/job/new

exports.newJob = async (req, res) => {
	const job = await Job.create(req.body);
	console.log(job);
	res.status(200).json({
		success: true,
		message: "Job created",
		data: job,
	});
};

// Search JObs with rqadius ==> api/v1/jobs/:zipcode/:distance

exports.getJobsInRadius = async (req, res, next) => {
	const { zipcode, distance } = req.params;

	//Getting latitude and longitude from geocder with zipcode

	const loc = await geoCoder.geocode(zipcode);
	const latitude = loc[0].latitude;
	const longitude = loc[0].longitude;
	const radius = distance / 3963;

	const jobs = await Job.find({
		location: {
			$geoWithin: { $centerSphere: [[longitude, latitude], radius] },
		},
	});

	res.status(200).json({
		success: true,
		results: jobs.length,
		data: jobs,
	});
};

// Update a Job:
exports.updateJob = async (req, res, next) => {
	let sjob = await Job.findById(req.params.id);

	if (!sjob) {
		res.status(404).json({
			success: false,
			message: "Job Not found",
		});
	}

	let job = await Job.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		message: "JOb is Updated ",
		data: job,
	});
};

exports.deleteJob = async (req, res) => {
	let job = await Job.findById(req.params.id);
	if (!job) {
		return res.status(404).json({
			success: false,
			message: "JOb Not Found",
		});
	}

	job = await Job.findByIdAndDelete(req.params.id);

	res.status(200).json({
		success: true,
		message: "JOb is Deleted!",
	});
};

//Get a single JOb with id and Slug ==> api/v1/job/:id/:slug
exports.getJob = async (req, res, next) => {
	try {
        let job = await Job.find({
            $and: [{ _id: req.params.id }, { slug: req.params.slug }],
        });
        if (!job || job.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found",
            });
        }
    
        res.status(200).json({
            success: true,
            message: job,
        });
    } catch (error) {
        console.log(error)
    }
};
