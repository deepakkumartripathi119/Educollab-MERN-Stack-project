const MicrosoftStrategy = require('passport-microsoft').Strategy;

module.exports = (passport) => {
    passport.use(new MicrosoftStrategy({
        callbackURL: process.env.CALLBACKURL,
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        scope: ['openid', 'profile', 'email', 'User.Read']
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
