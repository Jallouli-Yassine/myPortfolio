const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnection = require("./config/mongo.json");
const path = require("path");
const controller = require("./controller/Controller");


const PORT = 3000;

// MongoDB Connection
mongoose.connect(mongoconnection.url)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const projectsRoutes = require("./routes/projectRoots");
const skillRoutes = require('./routes/skillRoots');

app.use('/skill', skillRoutes);
app.use('/project', projectsRoutes);

const server = http.createServer(app);

// Socket.IO setup
const io = require("socket.io")(server);
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});