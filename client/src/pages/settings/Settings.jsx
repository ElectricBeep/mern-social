import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./settings.css";

const Settings = () => {
    //For updating user
    const [updatedUser, setUpdatedUser] = useState({});
    //For updating user's profile picture
    const [updatedProfilePic, setUpdatedProfilePic] = useState(null);
    //To display update successfull message
    const [successfull, setSuccessfull] = useState(false);

    const { user, dispatch } = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //Updaing state with inputs
    const handleChange = (e) => {
        setUpdatedUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    };

    //Sending update request
    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        if (updatedProfilePic) {
            const data = new FormData();
            const fileName = Date.now() + updatedProfilePic.name;
            data.append("name", fileName);
            data.append("file", updatedProfilePic);
            updatedUser.profilePicture = fileName;
            try {
                await axios.post("https://mern-socialmedia-backend.herokuapp.com/api/upload", data);
            } catch (err) {
                console.log(err);
            }
        };
        try {
            const res = await axios.put("https://mern-socialmedia-backend.herokuapp.com/api/users/" + user._id, updatedUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            setSuccessfull(true);
            setTimeout(function () {
                setSuccessfull(false);
            }, 2500);
        } catch (err) {
            console.log(err);
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    //To delete account
    const handleDelete = async (e) => {
        e.preventDefault();
        // const userId = {
        //     userId: user._id
        // }
        try {
            await axios.delete("https://mern-socialmedia-backend.herokuapp.com/api/users/" + user._id);
            dispatch({ type: "LOGOUT" })
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Topbar />
            <div className="settingsContainer">
                <Sidebar />
                <div className="settings">
                    <div className="settingsWrapper">
                        <h1 className="settingsTitle">Welcome to Settings Page</h1>
                        <div className="settingsDesc">
                            To update your profile, just edit input fields below and when
                            you're done, click the <b>Update</b> button.
                        </div>
                        <div className="settingsFormWrapper">
                            <form className="settingsFormLeft">
                                <div className="settingsFormSingle">
                                    <label className="settingsLabel">Username</label>
                                    <input
                                        className="settingsInput"
                                        type="text"
                                        name="username"
                                        placeholder={user.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="settingsFormSingle">
                                    <label className="settingsLabel">Email</label>
                                    <input
                                        className="settingsInput"
                                        type="email"
                                        name="email"
                                        placeholder={user.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="settingsFormSingle">
                                    <label className="settingsLabel">Password</label>
                                    <input
                                        className="settingsInput"
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="settingsFormSingle">
                                    <label className="settingsLabel">Current Location</label>
                                    <input
                                        className="settingsInput"
                                        type="text"
                                        name="city"
                                        placeholder={user.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="settingsFormSingle">
                                    <label className="settingsLabel">Place of Birth</label>
                                    <input
                                        className="settingsInput"
                                        type="text"
                                        name="from"
                                        placeholder={user.from}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="settingsFormSingle">
                                    <label className="settingsLabel">Description</label>
                                    <input
                                        className="settingsInput"
                                        type="text"
                                        name="desc"
                                        placeholder={user.desc}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                            <form className="settingsFormRight">
                                <div className="settingsFormRightText">
                                    Click the image below to select new profile image.
                                </div>
                                <label htmlFor="file">
                                    <input
                                        style={{ display: "none" }}
                                        type="file"
                                        id="file"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={(e) => setUpdatedProfilePic(e.target.files[0])}
                                    />
                                    {updatedProfilePic ? (
                                        <img
                                            className="settingsFormRightImg"
                                            src={URL.createObjectURL(updatedProfilePic)}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className="settingsFormRightImg"
                                            src={
                                                user.profilePicture
                                                    ? PF + user.profilePicture
                                                    : PF + "person/noAvatar.png"
                                            }
                                            alt=""
                                        />
                                    )}
                                    <div className="settingsFormRightInstruction">
                                        If you are updating profile picture, you may need
                                        <br />
                                        to log in again for changes to take effect.
                                    </div>
                                </label>
                                <button
                                    onClick={handleDelete}
                                    className="settingsDeleteButton"
                                >
                                    Delete Account
                                </button>
                            </form>
                        </div>
                        {successfull ? (
                            <div className="settingsSuccess">Update Successfull!</div>
                        ) : (
                            <div className="settingsSuccess"></div>
                        )}
                        <button className="settingsUpdateButton" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings