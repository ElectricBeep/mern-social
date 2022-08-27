import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../post/Post";
import "./searchFeed.css";

const SearchFeed = ({ query }) => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getPostsBySearch = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts/search/findposts${query}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPostsBySearch();
        const getUsersBySearch = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/users/search/finduser${query}`);
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getUsersBySearch();
    }, [query]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //To display messsage if no posts match search term
    const noPosts = !posts || posts.length === 0;

    //To display message if no users match searched term
    const noUsers = !users || users.length === 0;

    return (
        <div className="searchFeed">
            <div className="searchFeedWrapper">
                <div className="searchFeedTitle">Users that match your search term</div>
                {noUsers && <div className="searchFeedEmpty">No users match your search term.<br /> Try searching for something else.</div>}
                {users.map(u => (
                    <div className="searchedUsers" key={u._id}>
                        <Link
                            to={`/profile/${u.username}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div className="searchedUser">
                                <img
                                    src={u.profilePicture
                                        ? PF + u.profilePicture
                                        : PF + "person/noAvatar.png"}
                                    alt=""
                                    className="searchedUserImg"
                                />
                                <div className="searchedUserUsername">
                                    {u.username}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                <div className="searchFeedTitle">Posts that match your search term</div>
                {noPosts && <div className="searchFeedEmpty">No posts match your search term.<br /> Try searching for something else.</div>}
                {posts.map(p => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}

export default SearchFeed