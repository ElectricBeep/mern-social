import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Settings } from "@mui/icons-material";

export default function Profile() {
	const [user, setUser] = useState({});
	//For updating cover picture
	const updatedUser = {};
	const [updatedCoverPic, setUpdatedCoverPic] = useState(null);
	const username = useParams().username;

	const { user: currentUser, dispatch } = useContext(AuthContext);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		const fetchUser = async () => {
			//To get user from url we will use userParams
			const res = await axios.get(`${process.env.REACT_APP_BASE_URL}users?username=${username}`);
			setUser(res.data);
		};
		fetchUser();
	}, [username]);

	//To update cover picture
	const handleUpdate = async () => {
		dispatch({ type: "UPDATE_START" });
		if (updatedCoverPic) {
			const data = new FormData();
			const fileName = Date.now() + updatedCoverPic.name;
			data.append("name", fileName);
			data.append("file", updatedCoverPic);
			updatedUser.coverPicture = fileName;
			try {
				await axios.post(`${process.env.REACT_APP_BASE_URL}upload`, data);
			} catch (err) {
				console.log(err);
			}
		};
		try {
			const res = await axios.put(`${process.env.REACT_APP_BASE_URL}users/` + currentUser._id, updatedUser);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
			console.log(res.data);
			window.location.reload();
		} catch (err) {
			console.log(err);
			dispatch({ type: "UPDATE_FAILURE" });
		}
	};

	return (
		<>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							{updatedCoverPic ? (
								<img
									src={URL.createObjectURL(updatedCoverPic)}
									alt="" className="profileCoverImg"
								/>
							) : (
								<img
									src={user.coverPicture
										? PF + user.coverPicture
										: PF + "person/noCover.jpg"}
									alt="" className="profileCoverImg"
								/>
							)}
							<img
								src={user.profilePicture
									? PF + user.profilePicture
									: PF + "person/noAvatar.png"}
								alt=""
								className="profileUserImg"
							/>
							{currentUser.username === user.username && (
								<>
									<label htmlFor="file">
										<Settings className="profileSettingsIcon" />
										<input
											style={{ display: "none" }}
											type="file"
											id="file"
											accept=".png, .jpg, .jpeg"
											onChange={(e) => setUpdatedCoverPic(e.target.files[0])}
										/>
									</label>
									{updatedCoverPic && (
										<button
											className="profileSettingsUpdateButton"
											onClick={handleUpdate}
										>
											Save
										</button>
									)}
								</>
							)}
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">{user.desc}</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
						{/* So that it knows it's in the profile page and not home*/}
						{/* and it can render only posts from that user */}
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</>
	)
}
