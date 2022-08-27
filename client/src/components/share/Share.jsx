import "./share.css";
import { PermMedia, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
    //For selecting a photo we want to upload
    const [file, setFile] = useState(null);

    const { user } = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const desc = useRef();

    //This handles uploading new post including pics
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            //We need to give name like this so if other users uploads file with the same
            //name we don't cause conflict
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("https://mern-socialmedia-backend.herokuapp.com/api/upload", data);
            } catch (err) { }
            //.img is the field we created in our Post.js Model
        }
        try {
            await axios.post("https://mern-socialmedia-backend.herokuapp.com/api/posts", newPost);
            window.location.reload(); //This line will refresh the page after adding the post
        } catch (err) { }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"}
                        alt=""
                        className="shareProfileImg"
                    />
                    <div className="shareTopWrapper">
                        <div className="shareTopTitle">Create a New Post</div>
                        <input
                            placeholder={`What's on your mind ${user.username}?`}
                            className="shareInput"
                            maxLength={150}
                            ref={desc}
                        />
                    </div>
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia className="shareIcon perm_media" />
                            <span className="shareOptionText">Add a Photo</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
