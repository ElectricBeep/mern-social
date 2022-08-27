const Conversation = require("../models/Conversation");
const User = require("../models/User");
const router = require("express").Router();

//NEW CONVERSATION
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET CONVERSATION
router.get("/find/conversation/:conversationId", async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.conversationId);
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET CONVERSATION OF A USER
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get conversation that includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] }
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;