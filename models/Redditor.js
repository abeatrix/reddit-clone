const mongoose = require('mongoose');

// Schema('template', option configurational obj)
const redditorSchema = new mongoose.Schema(
    {
        username: {type: String, required: [true, 'you must provide a username.'] },
        password: {type: String, required: true},
        email: {type: String, required: true},
        karma: {type: Number, default: 0},
    },
    {
        timestamps: true,
        createdAt: "signupAt"
    }
);

const Redditor = mongoose.model('Redditor', redditorSchema);

module.exports = Redditor;
