import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Post from "../../components/post/Post";
import "./bookmarkFeed.css";

const BookmarkFeed = () => {
    //To get bookmarks
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getBookmarkedPosts = async () => {
            try {
                const res = await axios.get("https://mern-socialmedia-backend.herokuapp.com/api/users/bookmarks/" + user._id);
                setBookmarkedPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getBookmarkedPosts();
    }, [user._id]);

    //To display messsage if user has no bookmarks
    const noBookmarks = !bookmarkedPosts || bookmarkedPosts.length === 0;

    return (
        <div className="bookmark">
            <div className="bookmarkWrapper">
                <div className="bookmarkTitle">Bookmarked Posts</div>
                {noBookmarks && <div className="bookmarkEmpty">You haven't bookmarked any posts.</div>}
                {bookmarkedPosts.map(p => (
                    <Post key={p._id} post={p} type={"bookmark"} />
                ))}
            </div>
        </div>
    )
}

export default BookmarkFeed