// const express = require('express');
// const passport = require('passport');
// let userData;
// const router = express.Router();

// // Auth
// router.get('/microsoft', passport.authenticate('microsoft', { scope: ['openid', 'profile', 'email', 'User.Read'] }));

// // Auth Callback
// router.get('/microsoft/redirect', passport.authenticate('microsoft', {
//     successRedirect: '/auth/microsoft/redirect/success',
//     failureRedirect: '/auth/microsoft/redirect/failure'
// }));

// // Success
// router.get('/microsoft/redirect/success', (req, res) => {
//     if (!req.user) {
//         return res.redirect('/auth/microsoft/redirect/failure');
//     }
//     // Middleware to console log user details
//     const logUserDetails = (req, res, next) => {
//         userData=req.user;
//         console.log(req.user);
//         next();
//     };
//     logUserDetails(req, res, () => {
//         res.render('success');
//     });
// });

// // Failure
// router.get('/microsoft/redirect/failure', (req, res) => {
//     res.send('Error');
// });

// module.exports =router;

const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../Models/userModel');

let userData;


router.get('/microsoft', passport.authenticate('microsoft', { scope: ['openid', 'profile', 'email', 'User.Read'] }));

// Auth Callback
router.get('/microsoft/redirect', passport.authenticate('microsoft', {
    successRedirect: '/auth/microsoft/redirect/success',
    failureRedirect: '/auth/microsoft/redirect/failure'
}));

// Middleware to log user details and store userData
const logUserDetails = (req, res, next) => {
    userData = req.user;
    if (!userData || !userData._json || !userData._json.mail || !userData.displayName) {
        return res.redirect('/auth/microsoft/redirect/failure');
    }
    req.userData = userData; // Storing userData in the request object
    next();
};

// Success
router.get('/microsoft/redirect/success', logUserDetails, async (req, res) => {
    try {
        // Extract user details from the Microsoft authentication response
        const userEmail = req.userData._json.mail;

        // Check if the user already exists in the database
        let existingUser = await User.findOne({ email: userEmail }).exec();

        if (!existingUser) {

            console.log("New User Data : \n Email: ", userEmail, "\nUsername : ", req.userData.displayName);
            // If the user doesn't exist, create a new user

            const newUser = new User({
                email: userEmail,
                username: req.userData.displayName,
                creditScore: 30,
                
            });

            await newUser.save();

            console.log('New user created:', newUser);
        }
        else {
            console.log("User already exists!!")
        }

        // Redirect the user to the dashboard
        res.redirect('http://localhost:3000/dashboard');
    } catch (error) {
        console.error('Error while processing user data:', error);
        res.redirect('/auth/microsoft/redirect/failure');
    }
});

// Failure
router.get('/microsoft/redirect/failure', (req, res) => {
    res.send('Error');
});

router.get('/userData', (req, res) => {
    if (userData) {
        res.json(userData);
    } else {
        res.status(404).json({ error: 'User data not found' });
    }
});


router.get('/userdata/mobile', async (req, res) => {
    try {
        // Extract user email from the query parameters
        const userEmail = req.query.email;
        if (!userEmail) {
            return res.status(400).json({ error: 'Email parameter is required' });
        }

        // Check if the user exists in the database based on the provided email
        let existingUser = await User.findOne({ email: userEmail }).exec();

        if (!existingUser) {
            console.log("User not found for email:", userEmail);
            return res.status(404).json({ error: 'User not foundasdfasdf' });
        }

        // Send the user data as JSON response
        res.json(existingUser);
    } catch (error) {
        console.error('Error while processing user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;