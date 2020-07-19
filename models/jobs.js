
const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const geoCoder = require('../utils/geocoder');

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please enter Job title.'],
        trim : true,
        maxlength : [100, 'Job title can not exceed 100 characters.']
    },
    slug : String,
    description : {
        type : String,
        required : [true, 'Please enter Job description.'],
        maxlength : [1000, 'Job description can not exceed 1000 characters.']
    },
    email : {
        type : String,
        validate : [validator.isEmail, 'Please add a valid email address.']
    },
    address : {
        type : String,
        required : [true, 'Please add an address.']
    },
    location :{
        type : {
            type : String,
            enum : ['Point']
        },
        coordinates : {
            type : [Number],
            index : '2dsphere'
        },
        formattedAddress : String,
        city : String,
        state : String,
        zipcode : String,
        country : String
    },
    company : {
        type : String,
        required : [true, 'Please add Company name.']
    },
    industry : {
        type : [String],
        required : [true , 'Please enter industry for this job.'],
        enum : {
            values : [
                'Business',
                'Information Technology',
                'Banking',
                'Education/Training',
                'Telecommunication',
                'Others'
            ],
            message : 'Please select correct options for industry.'
        }
    },
    jobType : {
        type : String,
        required : [true, 'Please enter job type.'],
        enum : {
            values : [
                'Permanent',
                'Temporary',
                'Internship'
            ],
            message : 'Please select correct options for job type.'
        }
    },
    minEducation : {
        type : String,
        required : [true, 'Please enter minimum education for this job.'],
        enum : {
            values : [
                'Bachelors',
                'Masters',
                'Phd'
            ],
            message : 'Please select correct options for Education.'
        }
    },
    positions : {
        type : Number,
        default : 1
    },
    experience : {
        type : String,
        required : [true, 'Please enter experience required for this job.'],
        enum : {
            values : [
                'No Experience',
                '1 Year - 2 Years',
                '2 Year - 5 Years',
                '5 Years+'
            ],
            message : 'Please select correct options for Experience.'
        }
    },
    salary : {
        type : Number,
        required : [true, 'Please enter expected salary for this job.']
    },
    postingDate : {
        type : Date,
        default : Date.now
    },
    lastDate : {
        type : Date,
        default : new Date().setDate(new Date().getDate() + 7)
    },
    applicantsApplied : {
        type : [Object],
        select : false
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
    }
});

// Creating Job Slug before saving
jobSchema.pre('save', function(next) {
    // Creating slug before saving to DB
    this.slug = slugify(this.title, {lower : true});

    next();
});

// Setting up Location
jobSchema.pre('save', async function(next) {
    const loc = await geoCoder.geocode(this.address);

    this.location = {
        type : 'Point',
        coordinates : [loc[0].longitude, loc[0].latitude],
        formattedAddress : loc[0].formattedAddress,
        city : loc[0].city,
        state : loc[0].stateCode,
        zipcode : loc[0].zipcode,
        country : loc[0].countryCode
    }
    next()
});


module.exports = mongoose.model('Job', jobSchema);





















// const mongoose = require('mongoose');
// const validator = require('validator');

// const jobSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//     maxlength: [100, "The title can't exceed 100 chars"],
//   },
//   email: {
//     type: String,
//     validate: [validator.isEmail, 'Please enter a valid emails'],
//   },
//   slug: String,
//   description: {
//     type: String,
//     required: true,
//     maxlength: [1000, "The description can't exceed 1000"],
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   company: {
//     type: String,
//     required: true,
//   },
//   industry: {
//     type: [String],
//     required: true,
//     enum: {
//       value: [
//         'Business',
//         'Information Technlogy',
//         'Education',
//         'Telecommunication',
//       ],
//       message: 'Please select Correct Option',
//     },
//   },
//   jobType: {
//     type: String,
//     required: true,
//     enum: {
//       values: ['Permanent', 'Temporary', 'Internship'],
//       message: 'Please select correct option',
//     },
//   },
//   minEducation: {
//     type: String,
//     required: true,
//     enum: {
//       values: ['Bachelors', 'Masters', 'PhD'],
//       message: 'Please select correct option for Education',
//     },
//   },
//   positions: {
//     type: Number,
//     default: 1,
//   },
//   experience: {
//     type: String,
//     required: true,
//     enum: {
//       values: [
//         'NO experience',
//         '1 year - 2 years',
//         '2 years - 5 Years',
//         '5 years +',
//       ],
//       message: 'Please select correct option',
//     },
//   },
//   salary: {
//     type: Number,
//     required: [true, 'Please enter expected Salary'],
//   },
//   postingDate: {
//     type: Date,
//     default: Date.now,
//   },
//   lastDate: {
//     type: Date,
//     default: new Date().setDate(new Date().getDate() + 7),
//   },
//   applicantsApplied: {
//     type: [Object],
//     select: false,
//   },
// });

// module.exports = mongoose.model('Job', jobSchema);
