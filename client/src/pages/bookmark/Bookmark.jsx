import BookmarkFeed from "../../components/bookmarkFeed/BookmarkFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./bookmark.css";

const Bookmark = () => {
  return (
    <>
      <Topbar />
      <div className="bookmarkContainer">
        <Sidebar />
        <BookmarkFeed />
        <Rightbar />
      </div>
    </>
  )
}

export default Bookmark