import { Link } from "react-router-dom";
import "./online.css";

export default function Online({ user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img
                        src={user.profilePicture
                            ? (PF + user.profilePicture)
                            : (PF + "person/noAvatar.png")}
                        alt=""
                        className="rightbarProfileImg"
                    />
                    {/* <span className="rightbarOnline"></span> */}
                </div>
                <span className="rightbarUserName">{user.username}</span>
            </li>
        </Link>
    )
}