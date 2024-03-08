const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require("path");
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected successfully!");
    } catch (err) {
        console.log(err);
    }
}


// Middleware setup
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// CORS setup
app.use(cors({
    origin: ['http://localhost:5173', 'https://blog-app07.netlify.app'],
    credentials: true
}));

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

// Image upload setup
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images");
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img);
    }
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Image has been uploaded successfully!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log("App is running on port " + PORT);
});
