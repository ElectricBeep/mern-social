import "./search.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import SearchFeed from "../../components/searchFeed/SearchFeed";
import { useLocation } from "react-router-dom";

const Search = () => {
  const query = useLocation().search;

  return (
    <>
      <Topbar />
      <div className="searchContainer">
        <Sidebar />
        <SearchFeed query={query} />
        <Rightbar />
      </div>
    </>
  )
}

export default Search