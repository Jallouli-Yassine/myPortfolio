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

// Allowed origins
const allowedOrigins = ['https://jallouli-yassine-portfolio.vercel.app', 'http://localhost:4200'];

// Use CORS middleware with specific options
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials if needed
    optionsSuccessStatus: 204
}));

// Set explicit CORS headers for preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.header('Origin'));
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

app.use('/skill', skillRoutes);
app.use('/project', projectsRoutes);
app.use('/testimonial', testimonialsRouts);

app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
});

const server = http.createServer(app);
//emit tabath w on tekbel
// Socket.IO setup
const io = require("socket.io")(server);
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('user_connected', { message: 'A user connected' });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        socket.emit('user_disconnect', { message: 'A user disconnect' });
    });
});


const s = server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

s.timeout = 20000; // 20 seconds
