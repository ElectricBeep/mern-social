import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Bookmark from "./pages/bookmark/Bookmark";
import Question from "./pages/question/Question";
import Group from "./pages/group/Group";
import Settings from "./pages/settings/Settings";
import Search from "./pages/search/Search";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Register />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/messenger" element={user ? <Messenger /> : <Register />} />
        <Route path="/bookmark" element={user ? <Bookmark /> : <Register />} />
        <Route path="/question" element={user ? <Question /> : <Register />} />
        <Route path="/group" element={user ? <Group /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/search/searchposts" element={user ? <Search /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;