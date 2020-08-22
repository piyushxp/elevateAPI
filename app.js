const express = require('express')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
const app = express()
// const helmet = require('helmet')
//Importing all routes
const jobs = require('./routes/jobs')


//Setting up config file
dotenv.config({path: './config/config.env'})
//connect to mongoDB
connectDatabase()
// app.use(helmet())
//Setup Data Json incoming
app.use(express.json())

app.use('/api/v1',jobs)

const PORT = 3000



app.listen(PORT, () => {
    console.log('App listening on port 3000!');
});