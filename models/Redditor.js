const mongoose = require('mongoose');

// Schema('template', option configurational obj)
const redditorSchema = new mongoose.Schema(
    {
        username: {type: String, required: [true, 'you must provide a username.'] },
    },
    {
        karma: {type: Number},
    },
    {
        timestamps: true, //add a createdAt property that's automatic a date and updateAt
        // createAt: 'joined' your can rename these properties
    }
);

const Redditor = mongoose.model('Redditor', authorSchema);
