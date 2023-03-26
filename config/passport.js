const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel = require('../models/user');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    try {
      // checking if the user is in the database
      let user = await UserModel.findOne({googleId: profile.id});
      // if the UserModel doesn't find anything 
			// user variable is undefined, its not an error
			if(user) return cb(null, user);
      // if the user hasn't logged in before 
		  // Create the User in the database
      user = await UserModel.create({
        // project must store googleId
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      })
      // pass their information to the next piece of middleware
      cb(null, user)
    } catch(err){
		  cb(err)
		}

  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
  // ^^ this adds the user._id to our session cookie! Remember the session cookies is what is sent back 
  // and forth from the browser to identify who is making http requests to our server
});

passport.deserializeUser(function(userId, cb) {
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

    UserModel.findById(userId)
        .then(function(userDoc){
          cb(null, userDoc);  //<- this line is what assigns the userDoc to req.user, so essentially req.user = userDoc
          // passes the request to our controller now
    }).catch(err => {
      cb(err)
    })
});



