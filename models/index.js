//HUB for models and db connections
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/reddit-db';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})

//LOOKING FOR FEEDBACKS
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
})

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose is disconnected`);
})

mongoose.connection.on('error', () => {
    console.log(`Mongoose error: ${err}`);
})

//EXPORT
module.exports = {
    Redditor: require('./Redditor.js'),
    Post: require("./Post.js")
}
