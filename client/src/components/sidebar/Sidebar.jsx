import "./sidebar.css";
import { Home, Chat, AccountBox, Group, Bookmark, HelpOutline } from "@mui/icons-material";
import CloseFriend from "../../components/closeFriend/CloseFriend"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
    //For users followers
    const [followers, setFollowers] = useState([]);

    const { user } = useContext(AuthContext);
    const userId = user._id;

    //Get users followers
    useEffect(() => {
        const getUsersFollowers = async () => {
            try {
                const res = await axios.get("https://mern-socialmedia-backend.herokuapp.com/api/users/friends/" + userId);
                setFollowers(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getUsersFollowers();
    }, [userId]);

    const noFollowers = !followers || followers.length === 0;

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <li className="sidebarListItem">
                            <Home className="sidebarIcon" />
                            <span className="sidebarListItemText">Home</span>
                        </li>
                    </Link>
                    <Link to="/messenger" style={{ textDecoration: "none", color: "inherit" }}>
                        <li className="sidebarListItem">
                            <Chat className="sidebarIcon" />
                            <span className="sidebarListItemText">Chats</span>
                        </li>
                    </Link>
                    <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <li className="sidebarListItem">
                            <AccountBox className="sidebarIcon" />
                            <span className="sidebarListItemText">Profile</span>
                        </li>
                    </Link>
                    <Link to="/bookmark" style={{ textDecoration: "none", color: "inherit" }}>
                        <li className="sidebarListItem">
                            <Bookmark className="sidebarIcon" />
                            <span className="sidebarListItemText">Bookmarks</span>
                        </li>
                    </Link>
                    <Link to="/group" style={{ textDecoration: "none", color: "inherit" }}>
                        <li className="sidebarListItem">
                            <Group className="sidebarIcon" />
                            <span className="sidebarListItemText">Groups</span>
                        </li>
                    </Link>
                    <Link to="/question" style={{ textDecoration: "none", color: "inherit" }}>
                        <li className="sidebarListItem">
                            <HelpOutline className="sidebarIcon" />
                            <span className="sidebarListItemText">Questions</span>
                        </li>
                    </Link>
                </ul>
                {/* <button className="sidebarButton">Show More</button> */}
                <hr className="sidebarHr" />
                <div className="sidebarFollowersTitle">People You Follow</div>
                <ul className="sidebarFriendList">
                    {noFollowers && (
                        <div className="sidebarFriendListEmpty">
                            You don't follow any User
                        </div>
                    )}
                    {followers.map((u) => (
                        <CloseFriend key={u._id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
