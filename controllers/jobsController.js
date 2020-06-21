const Job = require('../models/jobs')

exports.getJobs = (req,res)=>{
    res.status(200).json({success:true})
}

//Create a new job = api/v1/job/new

exports.newJob = async (req,res,next)=>{
    const job = await Job.create(req.body);

    res.status(200).json({
        success: true,
        message: 'Job created',
        data: job
    })

}
