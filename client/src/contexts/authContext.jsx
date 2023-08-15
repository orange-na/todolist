import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  const [err, setErr] = useState();

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "https://todolistapi-q386.onrender.com/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://todolistapi-q386.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, err, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
