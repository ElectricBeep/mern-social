import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const [friends, setFriends] = useState([]); //To get current user's friends
    const [onlineFriends, setOnlineFriends] = useState([]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //Get current user's friends (followers)
    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get("https://mern-socialmedia-backend.herokuapp.com/api/users/friends/" + currentId);
                setFriends(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [currentId]);

    //If onlineUsers includes our friend
    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    //Set current chat when I click on user's profile picture or create new conversation
    const handleClick = async (user) => {
        try {
            const res = await axios.get(`https://mern-socialmedia-backend.herokuapp.com/api/conversations/find/${currentId}/${user._id}`);
            if (res.data === null) {
                try {
                    await axios.post("https://mern-socialmedia-backend.herokuapp.com/api/conversations", {
                        senderId: currentId,
                        receiverId: user._id
                    });
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
            }
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    //To display messsage if no friends are online
    const noOnlineFriends = !onlineFriends || onlineFriends.length === 0;

    return (
        <div className="chatOnline" >
            <div className="chatOnlineTitle">Online Friends</div>
            {noOnlineFriends && (
                <div className="chatOnlineEmpty">
                    No friends are online.
                </div>
            )}
            {onlineFriends.map((online) => (
                <div
                    className="chatOnlineFrined"
                    key={online._id}
                    onClick={() => handleClick(online)}
                >
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={
                                online?.profilePicture
                                    ? PF + online.profilePicture
                                    : PF + "person/noAvatar.png"
                            }
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{online?.username}</span>
                </div>
            ))}
        </div >
    )
}

export default ChatOnline