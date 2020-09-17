const mongoose = require('mongoose');

// Schema('template', option configurational obj)
const postSchema = new mongoose.Schema(
    {
        title: {type: String, required: [true, 'you must provide a title.'] },
        body: {type: String, required: [true, "you must provide content"]},
        upvotes: {type: Number, default: 0},
        redditor: {type: mongoose.Schema.Types.ObjectId, ref: 'Redditor'},
    },
    {
        timestamps: true,
        createdAt: "postedAt"
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

// git practice