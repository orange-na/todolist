import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChanged = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

  const handleLogin = () => {
    try {
      login(inputs);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-white p-5 text-center">
          <h2 className="mb-5">Login</h2>
          <div className="flex flex-col gap-5">
            <input
              className="py-2 px-4 border border-gray-300 rounded-md"
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChanged}
            />
            <input
              className="py-2 px-4 border border-gray-300 rounded-md"
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChanged}
            />
            <button
              className="bg-green-300 py-2 px-4 rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
