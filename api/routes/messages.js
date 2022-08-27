const Message = require("../models/Message");
const User = require("../models/User");
const router = require("express").Router();

//ADD MESSAGE
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    const receiverId = req.body.receiver;
    const senderId = req.body.sender;
    try {
        const savedMessage = await newMessage.save();

        //Sending notification
        //Get sender
        const sender = await User.findById(senderId);
        //Get receiver
        const receiver = await User.findById(receiverId);
        await receiver.updateOne({ $push: { messageNotifications: `${sender.username} messaged you!` } });

        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL MESSAGES FROM CONVERSATION
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;