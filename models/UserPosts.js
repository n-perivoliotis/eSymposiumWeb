const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserPostsSchema = new Schema({
    fbUser: {pageName: String},
    facebookPosts: [{
        descriptionText: String,
        timestamp: Date,
        videoUrls: [{String}],
        imagesUrls: [{String}],
        onlineUrls: [{String}],
        reactions: Number,
        totalComments: Number
    }]
});

// Export the model
module.exports = mongoose.model('UserPosts', UserPostsSchema, 'UserPosts');