import { Link } from "react-router-dom";

function NavBar() {
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
          <button>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
