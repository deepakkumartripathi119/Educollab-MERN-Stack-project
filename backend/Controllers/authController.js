<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> 275e54de885a417eae99909c2ba5e718d5a58f48
const MicrosoftStrategy = require('passport-microsoft').Strategy;

module.exports = (passport) => {
    passport.use(new MicrosoftStrategy({
<<<<<<< HEAD
        callbackURL: process.env.CALLBACK_URL,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scope: ['openid', 'profile', 'email', 'User.Read'],
        pkce: true,
        state: true
=======
        callbackURL: process.env.CALLBACKURL,
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        scope: ['openid', 'profile', 'email', 'User.Read']
>>>>>>> 275e54de885a417eae99909c2ba5e718d5a58f48
    }, (accessToken, refreshToken, profile, done) => {
        // Save the user profile in session or database as needed
        return done(null, profile);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
};
<<<<<<< HEAD


=======
>>>>>>> 275e54de885a417eae99909c2ba5e718d5a58f48
