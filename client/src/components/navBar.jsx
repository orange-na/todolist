import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="">
      <div className="h-[85px] flex justify-between items-center px-[50px] fixed w-full bg-white shadow-lg">
        <div>
          <Link to="/">
            <h1 className="text-[25px]">To Do List</h1>
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <p>
            <AccountCircleIcon
              className="text-gray-500 mr-2"
              sx={{ fontSize: 35 }}
            />
            {currentUser && currentUser.username}
          </p>
          <Link to="/register">
            <button className="bg-green-600 rounded-md py-2 px-3 text-white hover:bg-green-500 duration-200">
              Sign up
            </button>
          </Link>
          <button
            className="bg-green-600 rounded-md py-2 px-3 text-white hover:bg-green-500 duration-200"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
