const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//Update user
router.put("/:id", async (req, res) => {
    // if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
    // } else {
    //     return res.status(403).json("You can update only your account!")
    // }
});

//Delete user
router.delete("/:id", async (req, res) => {
    // if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted!");
    } catch (err) {
        return res.status(500).json(err);
    }
    // } else {
    //     return res.status(403).json("You can delete only your account!")
    // }
});

//Get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});
//This way we can use both username and userId to fecth a user
//We need this since in profile page we have access only to username

//Get all users
router.get("/all", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//Get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
});
//This request is to get friends for the profile rightbar

//Bookmark a post
router.put("/:id/bookmark", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!currentUser.bookmarkedPosts.includes(req.params.id)) {
            await currentUser.updateOne({ $push: { bookmarkedPosts: req.params.id } });
            res.status(200).json("Post has been bookmarked");
        } else {
            res.status(403).json("You have already bookmarked this post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Unbookmark a post
router.put("/:id/unbookmark", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        await currentUser.updateOne({ $pull: { bookmarkedPosts: req.params.id } });
        res.status(200).json("Post has been unbookmarked!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get users bookmarked posts
router.get("/bookmarks/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const posts = await Promise.all(
            user.bookmarkedPosts.map((postId) => {
                return Post.findById(postId)
            })
        )
        let postList = [];
        posts.map((post) => {
            const { _id, userId, desc, likes, img, createdAt, updatedAt } = post;
            postList.push({ _id, userId, desc, likes, img, createdAt, updatedAt });
        });
        res.status(200).json(postList);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            // if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await user.updateOne({ $push: { notifications: `${currentUser.username} just followed you!` } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("User has been followed");
            // } else {
            //     res.status(403).json("You already follow this user");
            // }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cant follow yourself");
    }
});

//Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You don't follow this user anymore!");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cant unfollow yourself");
    }
});

//Clear friends notifications
router.put("/:id/deleteNotifications", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.updateOne({ $set: { notifications: [] } });

        return res.status(200).json("Friend notifications cleared!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Clear message notifications
router.put("/:id/deleteMessageNotifications", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.updateOne({ $set: { messageNotifications: [] } });

        return res.status(200).json("Message notifications cleared!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Clear other notifications
router.put("/:id/deleteOtherNotifications", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.updateOne({ $set: { otherNotifications: [] } });

        return res.status(200).json("Other notifications cleared!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get users by search
router.get("/search/finduser", async (req, res) => {
    const query = req.query.q;
    try {
        const users = await User.find({
            username: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;