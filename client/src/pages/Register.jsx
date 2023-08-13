import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChanged = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);
  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        inputs,
        { withCredentials: true }
      );
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-white p-5 text-center">
          <h2 className="mb-5">Register</h2>
          <div className="flex flex-col gap-5">
            <input
              name="username"
              className="py-2 px-4 border border-gray-300 rounded-md"
              type="text"
              placeholder="username"
              onChange={handleChanged}
            />
            <input
              name="password"
              className="py-2 px-4 border border-gray-300 rounded-md"
              type="password"
              placeholder="password"
              onChange={handleChanged}
            />
            <button
              className="bg-green-500 py-2 px-4 rounded-md text-white"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
