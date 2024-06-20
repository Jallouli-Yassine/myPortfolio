const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const mongoconnection = require("./config/mongo.json");
const projectsRoutes = require("./routes/projectRoots");
const skillRoutes = require('./routes/skillRoots');
const testimonialsRouts = require('./routes/testimonialsRoot');

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

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/skills', express.static(path.join(__dirname, 'skills')));

// Use CORS middleware with specific options
app.use(cors({
    origin: 'https://jallouli-yassine-portfolio.vercel.app', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials if needed
    optionsSuccessStatus: 204
}));

// Set explicit CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://jallouli-yassine-portfolio.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use('/skill', skillRoutes);
app.use('/project', projectsRoutes);
app.use('/testimonial', testimonialsRouts);

app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
});

const server = http.createServer(app);

// Socket.IO setup
const io = require("socket.io")(server);
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const s = server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

s.timeout = 20000; // 60 seconds
