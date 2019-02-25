const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SymposiumUserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    symposiumUsername: {type: String, required: true},
    twitterUser: {
        username: {type: String, required: true},
        profileName: {type: String, required: true},
        description: {type: String, required: false},
        location: {type: String, required: false},
        dateAccountCreated: {type: Date, required: false},
        profilePictureUrl: {type: String, required: false},
        backgroundPictureUrl: {type: String, required: false},
        numOfTweets: {type: Number, required: false},
        follows: {type: Number, required: false},
        followers: {type: Number, required: false},
        likes: {type: Number, required: false}
    },
    facebookUser: {
        pageName: {type: String, required: true},
        username: {type: String, required: true},
        description: {type: String, required: false},
        birthday: {type: Date, required: false},
        profilePictureUrl: {type: String, required: false},
        backgroundPictureUrl: {type: String, required: false},
        placeOfOrigin: {type: String, required: false}
    }
});


// Export the model
module.exports = mongoose.model('SymposiumUser', SymposiumUserSchema, 'SymposiumUser');