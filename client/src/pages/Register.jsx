import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChanged = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://todolistapi-q386.onrender.com/api/auth/register",
        inputs,
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-slate-200 flex justify-center items-center">
        <div className="bg-white p-10 flex items-center justify-center flex-col text-center shadow-xl w-[40%] rounded-lg">
          <h2 className="mb-5 text-[25px]">Sign up</h2>
          <div className="flex justify-between flex-col gap-5 w-full">
            <input
              name="username"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="text"
              placeholder="Username"
              onChange={handleChanged}
            />
            <input
              name="password"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="Password"
              placeholder="password"
              onChange={handleChanged}
            />
            {err && <p className="text-red-600">{err}</p>}
            <button
              className="bg-green-500 py-2 px-4 rounded-md text-white mt-5 hover:bg-green-600 duration-200"
              onClick={handleRegister}
            >
              Sign up
            </button>
            <p>
              You have an account??
              <Link
                to="/login"
                className="text-red-400 hover:text-red-500 duration-200 ml-3"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
