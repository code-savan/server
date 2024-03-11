const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully!");
    } catch (err) {
        console.log(err);
    }
}


// Middleware setup
dotenv.config();
app.use(express.json());


// CORS setup
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'https://drlawsonakpulonu.com', 'https://drlawsonakpulonu.netlify.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


// Cookie parser middleware
app.use(cookieParser());

// Routes setup
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

app.get('/', (req, res) => {
    res.send({message: 'Welcome to the API'})}
)


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log("App is running on port " + PORT);
});