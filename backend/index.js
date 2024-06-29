/**
 * @file This file contains the main server code for the backend of the application.
 * @module index.js
 */

const env=require("dotenv");
env.config({path: __dirname+'/.env'});
const express=require('express');
const cors=require('cors');
const app=express();


// ... Rest of the code ...

/**
 * Starts the server and listens on the specified port.
 * @function
 * @name listen
 * @param {number} port - The port number on which the server should listen.
 * @returns {void}
 */
const bodyParser = require('body-parser');

const connectDB=require("./Config/db.js");

app.use(cors());
app.use(express.json());
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Auth starts here

const session = require('express-session');
const passport = require('passport');
const authController = require('./Controllers/authController.js');

// Session configuration
app.use(session({
    secret: process.env.CLIENTSECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

// Use the authentication Controller
authController(passport);

const userRoutes = require('./Routes/userRoute.js');
const doubtsRoute = require('./Routes/doubtsRoute');
const authRoutes = require('./Routes/authRoutes.js');
const projectRoutes = require('./Routes/projectRoute.js');

const collabsRoute = require('./Routes/collabsRoute.js');
const courseRoutes = require('./Routes/courseRoute.js');

app.use('/api/doubts', doubtsRoute);
app.use('/api/collab', collabsRoute);
// Use authentication routes
app.use('/auth', authRoutes);

// Auth ends here

app.use('/users', userRoutes);

app.use('/projects', projectRoutes);

app.use('/courses', courseRoutes);


const PORT = 5500 || process.env.PORT;

const server = app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));

/*------------------------------------Chat starts here------------------------------------*/

const io = require('socket.io')(server, {
    pingTimeout: 6000000,
    cors: {
        origin: "http://localhost:3000",
    }
});
let socketRoomsMap = new Map();
io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);
    socketRoomsMap.set(socket.id, []); // Initialize the array of rooms for the socket

    socket.on('join-room', (data) => {
        const room = data.room;
        socketRoomsMap.get(socket.id).push(room); // Add the room to the array of rooms for the socket
        socket.join(room);
        console.log(`${socket.id} joined collab: ${room}`);
    });

    socket.on('send-message', (chat) => {
        console.log(chat.message);
        console.log(chat.sendTo);
        if(socketRoomsMap.get(socket.id).includes(chat.sendTo)) // If the socket is in the room
            socket.to(chat.sendTo).emit('receive-message', chat); // Emit the message to all rooms the socket is in
        else 
            console.log('User is not in the room');
    });

    socket.on('disconnect', () => {
        socketRoomsMap.delete(socket.id); // Remove the socket from the map when disconnected
        console.log('User disconnected');
    });
});
