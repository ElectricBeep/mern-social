import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./commentsSection.css";

const CommentsSection = ({ post, setOpenComments }) => {
    const [comments, setComments] = useState([]);
    //For writing comment
    const [commentText, setCommentText] = useState("");

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user: currentUser } = useContext(AuthContext);

    //Get post by id
    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}posts/` + post._id);
                setComments(res.data.comments);
            } catch (err) {
                console.log(err);
            }
        };
        getPost();
    }, [post._id]);

    //For posting a comment
    const handlePostComment = async () => {
        const finalComment = `${currentUser?.username}: ${commentText}`;
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}posts/` + post._id + "/comment", {
                comment: finalComment
            });
            //To give instant update to comments field on page
            setComments(res.data.comments);
            setCommentText("");
            //Scrolling to the latest comment
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="commentsSection">
            <div className="commentsSectionPostCommentDetails">
                <div className="commentsSectionPostComment">
                    <img
                        className="postProfileImg"
                        src={
                            currentUser.profilePicture
                                ? PF + currentUser.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                    />
                    <input
                        className="commentsSectionInput"
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="commentsSectionSend" onClick={handlePostComment}>
                        Send
                    </button>
                </div>
                <span className="commentsSectionClose" onClick={() => setOpenComments(false)}>
                    close
                </span>
            </div>
            <div className="commentsSectionComments">
                {comments?.map((comment, index) => (
                    <div key={index}>
                        <div className="commentsSectionComment">
                            <Link className="commentSectionUsername" to={`/profile/${comment.split(": ")[0]}`}>
                                <strong>{comment.split(": ")[0]}:</strong>
                            </Link>
                            {comment.split(":")[1]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentsSection