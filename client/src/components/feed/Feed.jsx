import "./feed.css";
import Share from "../../components/share/Share";
import Post from "../../components/post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    //Make request to get posts data from api
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get(`${process.env.REACT_APP_BASE_URL}posts/profile/` + username)
                : await axios.get(`${process.env.REACT_APP_BASE_URL}posts/timeline/` + user._id);
            setPosts(res.data.sort((p1, p2) => { //This sort is used to sort posts by date
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
            );
        };
        fetchPosts();
    }, [username, user._id]);

    //To display messsage if there is no posts
    const noPosts = !posts || posts.length === 0;

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {/* Used to decide where to show the share component */}
                {noPosts && (
                    <div className="feedEmpty">
                        There is no posts to display.
                    </div>
                )}
                {posts.map(p => (
                    <Post key={p._id} post={p} type={"home"} />
                ))}
            </div>
        </div>
    )
}