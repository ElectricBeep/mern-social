import { Construction } from "@mui/icons-material";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./group.css";

const Group = () => {
    return (
        <>
            <Topbar />
            <div className="groupContainer">
                <Sidebar />
                <div className="group">
                    <div className="groupWrapper">
                        <div className="groupTitle">
                            Group section is currently under construction.
                        </div>
                        <Construction className="groupIcon" />
                    </div>
                </div>
                <Rightbar />
            </div>
        </>
    )
}

export default Group