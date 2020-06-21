const mongoose = require('mongoose');
const validator = require('validator');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "The title can't exceed 100 chars"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please enter a valid emails'],
  },
  slug: String,
  description: {
    type: String,
    required: true,
    maxlength: [1000, "The description can't exceed 1000"],
  },
  address: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  industry: {
    type: [String],
    required: true,
    enum: {
      value: [
        'Business',
        'Information Technlogy',
        'Education',
        'Telecommunication',
      ],
      message: 'Please select Correct Option',
    },
  },
  jobType: {
    type: String,
    required: true,
    enum: {
      values: ['Permanent', 'Temporary', 'Internship'],
      message: 'Please select correct option',
    },
  },
  minEducation: {
    type: String,
    required: true,
    enum: {
      values: ['Bachelors', 'Masters', 'PhD'],
      message: 'Please select correct option for Education',
    },
  },
  positions: {
    type: Number,
    default: 1,
  },
  experience: {
    type: String,
    required: true,
    enum: {
      values: [
        'NO experience',
        '1 year - 2 years',
        '2 years - 5 Years',
        '5 years +',
      ],
      message: 'Please select correct option',
    },
  },
  salary: {
    type: Number,
    required: [true, 'Please enter expected Salary'],
  },
  postingDate: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
  },
  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

module.exports = mongoose.model('Job', jobSchema);
