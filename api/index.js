const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require('multer');
const socket = require("socket.io");
//After uploading photo I moved everything from assets to node-rest-api\public\images and
//changed .env file from http://localhost:3000/assets/ to http://localhost:8800/images/
//and added this:
const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MONGODB")
});

//This means if you use this images path, don't send any request, just go to this directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

//midleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//For uploading pics to server side
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
    res.send("APP IS RUNNING");
});

const server = app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server is running!");
});

const io = socket(server, {
    cors: {
        origin: process.env.SOCKET_ORIGIN,
        credentials: true
    }
});
//By default it doesn't allow anyone to connect, so I have to add it like this

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("addUser", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("sendMessage", (data) => {
        const sendUserSocket = onlineUsers.get(data.receieverId);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("getMessage", data);
        };
    });
});