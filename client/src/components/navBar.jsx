import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";

function NavBar() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setCurrentUser("");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <div className="h-[100px] flex justify-between items-center px-[50px]">
        <div>
          <h1>To Do List</h1>
        </div>
        <div className="flex gap-5">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
          <p>{currentUser.username}</p>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
