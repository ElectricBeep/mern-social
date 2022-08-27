const Post = require("../models/Post");
const router = require("express").Router();
const User = require("../models/User");

//Create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated!");
        } else {
            res.status(403).json("You can update only your posts!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("The post has been deleted!");
        // } else {
        //     res.status(403).json("You can delete only your posts!");
        // }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Like/dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Get receiving user for notification
        const likeReceivingUser = await User.findById(post.userId);
        const user = req.body.userId;
        //Get sending user for notification
        const likeSendingUser = await User.findById(user);
        if (!post.likes.includes(user)) {
            await post.updateOne({ $push: { likes: user } });

            //Sending notification
            await likeReceivingUser.updateOne({ $push: { otherNotifications: `${likeSendingUser.username} liked your post!` } });

            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: user } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Comment a post
router.post("/:id/comment", async (req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    try {
        const post = await Post.findById(id);
        post.comments.push(comment);

        const commentedPost = await Post.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(commentedPost);
    } catch (error) {
        res.status(500).json(err);
    }
});

//Get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).send(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all user's posts
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get post by search
router.get("/search/findposts", async (req, res) => {
    const query = req.query.q;
    try {
        const posts = await Post.find({
            desc: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;