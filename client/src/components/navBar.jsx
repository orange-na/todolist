import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
          <p>{currentUser && currentUser.username}</p>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
