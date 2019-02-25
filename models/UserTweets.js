const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserTweetsSchema = new Schema({
    aUser: {profileName: String},
    tweets: [{
        text: String,
        timestamp: Date,
        hashtags: [{String}],
        mediaUrls: [{String}],
        retweets: Number,
        likes: Number
    }]
});


// Export the model
module.exports = mongoose.model('UserTweets', UserTweetsSchema, 'UserTweets');