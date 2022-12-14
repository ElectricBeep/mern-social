import "./message.css";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Message = ({ message, own }) => {
    const { user } = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {own ? (
                    <img
                        className="messageImg"
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                    />
                ) : (
                    <img
                        className="messageImg"
                        src={PF + "person/noAvatar.png"}
                        alt=""
                    />
                )}
                <p className="messageText">
                    {message.text}
                </p>
            </div>
            <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
        </div>
    )
}

export default Message