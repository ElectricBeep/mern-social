import './rightbar.css';
import Online from "../../components/online/Online"
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove, Settings, Email } from "@mui/icons-material";

export default function Rightbar({ user }) {
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    //For all users
    const [allUsers, setAllUsers] = useState([]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //To get users that we are following
    useEffect(() => {
        if (user) {
            const getFriends = async () => {
                try {
                    const friendList = await axios.get(`${process.env.REACT_APP_BASE_URL}users/friends/` + user._id);
                    setFriends(friendList.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getFriends();
        };
    }, [user]);

    //For following
    const handleFollow = async () => {
        if (user) {
            try {
                await axios.put(`${process.env.REACT_APP_BASE_URL}users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        };
    };

    //FOr unfollowing
    const handleUnfollow = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}users/${user._id}/unfollow`, {
                userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    //Get all users
    useEffect(() => {
        const getallUsers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}users/all`);
                setAllUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getallUsers();
    }, []);

    //Filtering all users with current user and people he follows
    const filteredUsers = allUsers.filter((item) => (
        item._id !== currentUser._id && !currentUser?.followings?.includes(item._id)
    ));

    const HomeRightbar = () => {
        return (
            <>
                <span className="promotionText">Promotion:</span>
                <hr className="promotionHr" />
                <img src="assets/ad.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">People You May Know</h4>
                <ul className="rightbarFriendList">
                    {filteredUsers.slice(0, 10).map((user) => (
                        <Online key={user._id} user={user} />
                    ))}
                </ul>
            </>
        );
    };

    //To send user to messenger page after successfully creating conversation
    const navigate = useNavigate();

    //Sending user to messenger page and creating new conversation if neccessary
    const handleMessage = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/find/${currentUser._id}/${user._id}`);
            if (res.data === null) {
                try {
                    await axios.post(`${process.env.REACT_APP_BASE_URL}conversations`, {
                        senderId: currentUser._id,
                        receiverId: user._id
                    });
                    navigate("/messenger")
                } catch (err) {
                    console.log(err);
                }
            }
            navigate("/messenger");
        } catch (err) {
            console.log(err);
        }
    };

    //To display message if user has no friends
    const noFriends = !friends || friends.length === 0;

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <>
                        {currentUser.followings.includes(user._id) ? (
                            <button className="rightbarFollowButton" onClick={handleUnfollow}>
                                Unfollow<Remove className="rightbarIcon" />
                            </button>
                        ) : (
                            <button className="rightbarFollowButton" onClick={handleFollow}>
                                Follow<Add className="rightbarIcon" />
                            </button>
                        )}
                        <button className="rightbarMessageUser" onClick={handleMessage}>
                            Message<Email className="rightbarIcon" />
                        </button>
                    </>
                )}
                {user.username === currentUser.username && (
                    <Link
                        to="/settings"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <button className="rightbarSettingsButton">
                            Settings<Settings className="rightbarSettingsIcon" />
                        </button>
                    </Link>
                )}
                <h4 className="rightbarTitle">User Information Title</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1
                            ? "Single"
                            : user.relationship === 2
                                ? "Married"
                                : "-"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {noFriends && (
                        <div className="rightbarFollowingsEmpty">
                            User has no Friends
                        </div>
                    )}
                    {friends.map((friend) => (
                        <Link
                            to={`/profile/${friend.username}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            key={friend._id}
                        >
                            <div className="rightbarFollowing">
                                <img
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + "person/noAvatar.png"
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">
                                    {friend.username}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
