const express = require('express')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
const app = express()
//Importing all routes
const jobs = require('./routes/jobs')


//Setting up config file
dotenv.config({path: './config/config.env'})
//connect to mongoDB
connectDatabase()


app.use('/api/v1',jobs)

const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    console.log('App listening on port 3000!');
});