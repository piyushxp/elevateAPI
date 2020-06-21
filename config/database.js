const mongoose = require('mongoose')

const connectDatabase = () =>{mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
}).then(con => {
console.log(`mongoDB is connected to ${con.connection.host}`)
})
}

module.exports = connectDatabase