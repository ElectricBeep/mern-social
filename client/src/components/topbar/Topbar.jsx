import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Topbar() {
    const [currentUser, setCurrentUser] = useState({});
    //To open notifications
    const [openFriendsNotification, setOpenFriendsNotification] = useState(false);
    const [openMessagesNotification, setOpenMessagesNotification] = useState(false);
    const [openOtherNotification, setOpenOtherNotification] = useState(false);
    //For searching
    const [searchTerm, setSearchTerm] = useState("");

    const { user, dispatch } = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    //To open/close notifications windows
    const handleOpenFriendsNotification = () => {
        setOpenMessagesNotification(false);
        setOpenOtherNotification(false);
        setOpenFriendsNotification(!openFriendsNotification);
    };
    const handleOpenMessagesNotification = () => {
        setOpenFriendsNotification(false);
        setOpenOtherNotification(false);
        setOpenMessagesNotification(!openMessagesNotification);
    };
    const handleOpenOtherNotification = () => {
        setOpenFriendsNotification(false);
        setOpenMessagesNotification(false);
        setOpenOtherNotification(!openOtherNotification);
    };

    //Getting user for updating notifications
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`https://mern-socialmedia-backend.herokuapp.com/api/users?userId=${user._id}`);
                setCurrentUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [user._id]);

    //To clear notifications
    const handleClearNotifications = async (type) => {
        try {
            if (type === "friend") {
                await axios.put(`https://mern-socialmedia-backend.herokuapp.com/api/users/${user._id}/deleteNotifications`);
            } else if (type === "message") {
                await axios.put(`https://mern-socialmedia-backend.herokuapp.com/api/users/${user._id}/deleteMessageNotifications`);
            } else {
                await axios.put(`https://mern-socialmedia-backend.herokuapp.com/api/users/${user._id}/deleteOtherNotifications`);
            }
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    //To navigate to search page
    const navigate = useNavigate();

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Socialis</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search
                        className="searchIcon"
                        onClick={() => navigate(`/search/searchposts?q=${searchTerm}`)}
                    />
                    <input
                        placeholder="Search for people or post!"
                        className="searchInput"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <span className="topbarLink">Home</span>
                    </Link>
                    <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <span className="topbarLink">Profile</span>
                    </Link>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem" onClick={handleOpenFriendsNotification}>
                        <Person />
                        {currentUser?.notifications?.length > 0 && (
                            <span className="topbarIconBadge">
                                {currentUser?.notifications?.length}
                            </span>
                        )}
                        {openFriendsNotification && (
                            <div className="topBarFriendsNotification">
                                {currentUser?.notifications?.length > 0 ? (
                                    currentUser?.notifications?.map((notification, index) => (
                                        <span className="topBarFriendsNotificationText" key={index}>
                                            {notification}
                                        </span>
                                    ))
                                ) : (
                                    "No notifications"
                                )}
                                {currentUser?.notifications?.length > 0 && (
                                    <button
                                        className="topBarClearNotifications"
                                        onClick={() => handleClearNotifications("friend")}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="topbarIconItem" onClick={handleOpenMessagesNotification}>
                        <Chat />
                        {currentUser?.messageNotifications?.length > 0 && (
                            <span className="topbarIconBadge">
                                {currentUser?.messageNotifications?.length}
                            </span>
                        )}
                        {openMessagesNotification && (
                            <div className="topBarFriendsNotification">
                                {currentUser?.messageNotifications?.length > 0 ? (
                                    currentUser?.messageNotifications?.map((notification, index) => (
                                        <span className="topBarFriendsNotificationText" key={index}>
                                            {notification}
                                        </span>
                                    ))
                                ) : (
                                    "No notifications"
                                )}
                                {currentUser?.messageNotifications?.length > 0 && (
                                    <button
                                        className="topBarClearNotifications"
                                        onClick={() => handleClearNotifications("message")}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="topbarIconItem" onClick={handleOpenOtherNotification}>
                        <Notifications />
                        {currentUser?.otherNotifications?.length > 0 && (
                            <span className="topbarIconBadge">
                                {currentUser?.otherNotifications?.length}
                            </span>
                        )}
                        {openOtherNotification && (
                            <div className="topBarFriendsNotification">
                                {currentUser?.otherNotifications?.length > 0 ? (
                                    currentUser?.otherNotifications?.map((notification, index) => (
                                        <span className="topBarFriendsNotificationText" key={index}>
                                            {notification}
                                        </span>
                                    ))
                                ) : (
                                    "No notifications"
                                )}
                                {currentUser?.otherNotifications?.length > 0 && (
                                    <button
                                        className="topBarClearNotifications"
                                        onClick={() => handleClearNotifications("other")}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="topbarLogoutContainer">
                    <div className="topbarLogout" onClick={handleLogout}>Logout</div>
                    <Link to={`/profile/${user.username}`}>
                        <img
                            src={
                                user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + "person/noAvatar.png"
                            }
                            alt=""
                            className="topbarImg"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}
