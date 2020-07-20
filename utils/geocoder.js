const  nodeGeocoder = require('node-geocoder')


const options = {
    provider:'mapquest',
    httpAdapter: 'https',
    apiKey:"YOmxm3W9RSlbc3qWeP7XH5UPVL7ADWAh",
    formatter:null,
}

const geoCoder = nodeGeocoder(options)

module.exports = geoCoder