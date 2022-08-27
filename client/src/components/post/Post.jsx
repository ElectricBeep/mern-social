import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CommentsSection from "../commentsSection/CommentsSection";

export default function Post({ post, type }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    //To open comments section
    const [openComments, setOpenComments] = useState(false);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user: currentUser, dispatch } = useContext(AuthContext);

    //Check if post has already been liked (if likes array already includes this user)
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    //Make request to get users data form api
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://mern-socialmedia-backend.herokuapp.com/api/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("https://mern-socialmedia-backend.herokuapp.com/api/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    };

    //To delete post
    const handleDelete = () => {
        const deletePost = async () => {
            try {
                const res = await axios.delete("https://mern-socialmedia-backend.herokuapp.com/api/posts/" + post._id);
                console.log(res.data);
                window.location.reload();
            } catch (err) {
                console.log(err)
            }
        }
        deletePost();
    };

    //Check if post is already bookmarked
    const bookmarked = currentUser.bookmarkedPosts.includes(post._id);

    //To display already bookmared message
    const [alreadyBookmarked, setAlreadyBookmarked] = useState(false);

    //To display bookmark success message
    const [bookmarkedSuccess, setBookmarkedSuccess] = useState(false);

    //To bookmark post
    const handleBookmark = async () => {
        try {
            if (bookmarked) {
                setAlreadyBookmarked(true);
                //Back to bookmark button
                setTimeout(function () {
                    setAlreadyBookmarked(false);
                }, 2500);
            } else {
                await axios.put(`https://mern-socialmedia-backend.herokuapp.com/api/users/${post._id}/bookmark`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "BOOKMARK", payload: post._id });
                setBookmarkedSuccess(true);
                //Back to bookmark button
                setTimeout(function () {
                    setBookmarkedSuccess(false);
                }, 2500);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //To unbookmark post
    const handleUnbookmark = async () => {
        try {
            await axios.put(`https://mern-socialmedia-backend.herokuapp.com/api/users/${post._id}/unbookmark`, {
                userId: currentUser._id,
            });
            dispatch({ type: "UNBOOKMARK", payload: post._id });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                                className="postProfileImg"
                            />
                        </Link>
                        <Link
                            to={`profile/${user.username}`}
                            style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}
                        >
                            <span className="postUserName">
                                {user.username}
                            </span>
                        </Link>
                        <span className="postDate">{moment(post.createdAt).fromNow()}</span>
                    </div>
                    {type === "bookmark" ? (
                        <div className="postTopRight">
                            <MoreVert className="shareIcon" />
                            <div className="postHoverMenu">
                                <span
                                    className="postHoverMenuTextUnbookmark"
                                    onClick={handleUnbookmark}
                                >
                                    Unbookmark
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="postTopRight">
                            <MoreVert className="shareIcon" />
                            <div className="postHoverMenu">
                                <span
                                    className="postHoverMenuTextBookmark"
                                    onClick={handleBookmark}
                                >
                                    {bookmarkedSuccess ? "Added" : "Bookmark"}
                                </span>
                                {alreadyBookmarked && (
                                    <span className="postAlreadyBookmarkedText">
                                        Already Bookmarked
                                    </span>
                                )}
                                {post.userId === currentUser._id && (
                                    <span
                                        className="postHoverMenuTextDelete"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img onClick={likeHandler} src={`${PF}posts/thumb-up-gc7e04b214_640.png`} alt="" className="likeIcon" />
                        <img onClick={likeHandler} src={`${PF}posts/heart-g2ef23a86a_640.png`} alt="" className="likeIcon" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span
                            className="postComment"
                            onClick={() => setOpenComments(!openComments)}
                        >
                            comments ({post?.comments?.length})
                        </span>
                    </div>
                </div>
                {openComments && (
                    <div className="postCommentsSection">
                        <CommentsSection post={post} setOpenComments={setOpenComments} />
                    </div>
                )}
            </div>
        </div>
    )
}