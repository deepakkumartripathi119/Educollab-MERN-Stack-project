require('dotenv').config();
const MicrosoftStrategy = require('passport-microsoft').Strategy;

module.exports = (passport) => {
    passport.use(new MicrosoftStrategy({
        callbackURL: process.env.CALLBACK_URL,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scope: ['openid', 'profile', 'email', 'User.Read'],
        pkce: true,
        state: true
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


