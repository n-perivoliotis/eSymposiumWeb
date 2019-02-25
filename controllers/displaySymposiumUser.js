const SymposiumUser = require('../models/SymposiumUser');
const UserTweets = require('../models/UserTweets');
const UserPosts = require('../models/UserPosts');


exports.allUsers = function (req, res) {

    SymposiumUser
        .find({})
        .exec(function (err, users) {
            if (err) return process.exit();

            let allSymposiumUsers = [];
            for (let i = 0; i < users.length; i++) {

                let symposiumUser = new SymposiumUser();
                symposiumUser.symposiumUsername = users[i].symposiumUsername;
                symposiumUser.twitterUser.followers = users[i].twitterUser.followers;
                allSymposiumUsers.push(symposiumUser);
            }

            res.render('index', { title: 'The big Symposium' , users: allSymposiumUsers });
        });
};

exports.displayUser = function (req, res) {

    execute();

    function execute(){

        function findTweets(symposiumUser) {

            function findFbPosts(symposiumUser, allTweets){

                function display(symposiumUser, allTweets, allPosts){
                    res.render('userInfo', {title: 'The big Symposium', user: symposiumUser, tweets: allTweets, posts: allPosts});
                }

                UserPosts.
                find({'fbUser.pageName' : req.params.username}).
                exec(function (err, foundPosts) {
                    if (err) return process.exit();

                    let userPost = new UserPosts();
                    userPost.facebookPosts = [];

                    for(let i = 0; i < 100; i++){
                        userPost.facebookPosts.push({});
                        userPost.facebookPosts[i].descriptionText = foundPosts[0].facebookPosts[i].descriptionText;
                        userPost.facebookPosts[i].totalComments = foundPosts[0].facebookPosts[i].totalComments;
                        userPost.facebookPosts[i].reactions = foundPosts[0].facebookPosts[i].reactions;
                        userPost.facebookPosts[i].timestamp = foundPosts[0].facebookPosts[i].timestamp;
                    }

                    display(symposiumUser, allTweets, userPost.facebookPosts);
                });

            }

            UserTweets.
            find({'aUser.profileName' : req.params.username}).
            exec(function (err, foundTweets) {
                if (err) return process.exit();

                let userTweet = new UserTweets();
                userTweet.tweets = [];

                for(let i = 0; i < 100; i++){
                    userTweet.tweets.push({});
                    userTweet.tweets[i].text = foundTweets[0].tweets[i].text;
                    userTweet.tweets[i].retweets = foundTweets[0].tweets[i].retweets;
                    userTweet.tweets[i].likes = foundTweets[0].tweets[i].likes;
                    userTweet.tweets[i].timestamp = foundTweets[0].tweets[i].timestamp;
                }

                findFbPosts(symposiumUser, userTweet.tweets);
            });
        }


        SymposiumUser
            .find({symposiumUsername : req.params.username})
            .exec(function (err, foundUser) {
                if (err) return process.exit();

                let symposiumUser = new SymposiumUser();
                symposiumUser.symposiumUsername = foundUser[0].symposiumUsername;
                symposiumUser.twitterUser.username = foundUser[0].twitterUser.username;
                symposiumUser.twitterUser.profilePictureUrl = foundUser[0].twitterUser.profilePictureUrl;
                symposiumUser.twitterUser.followers = foundUser[0].twitterUser.followers;
                symposiumUser.twitterUser.numOfTweets = foundUser[0].twitterUser.numOfTweets;
                symposiumUser.twitterUser.description = foundUser[0].twitterUser.description;
                symposiumUser.facebookUser.username = foundUser[0].facebookUser.username;
                symposiumUser.facebookUser.description = foundUser[0].facebookUser.description;
                symposiumUser.facebookUser.profilePictureUrl = foundUser[0].facebookUser.profilePictureUrl;

                findTweets(symposiumUser);
            });

    }



};