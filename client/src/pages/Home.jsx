import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar";
import { AuthContext } from "../contexts/authContext";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [inputs, setInputs] = useState({ desc: "" });

  // const fetchApi = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://todolistapi-q386.onrender.com/api/tasks",
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     const data = res.data;
  //     setTasks(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { currentUser } = useContext(AuthContext);
  const fetchApi = async () => {
    try {
      const res = await axios.post(
        "https://todolistapi-q386.onrender.com/api/tasks",
        { uid: currentUser.id },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchApi(), 500);
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    try {
      await axios.post(
        "https://todolistapi-q386.onrender.com/api/tasks/add",
        {
          ...inputs,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          uid: currentUser.id,
        },
        {
          withCredentials: true,
        }
      );
      await fetchApi();
      setInputs({ desc: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (task) => {
    const taskId = task.id;
    try {
      await axios.delete(
        "https://todolistapi-q386.onrender.com/api/tasks/delete/" + taskId
      );
    } catch (error) {
      console.log(error);
    }
    const newTasks = tasks.filter((prev) => prev.id !== taskId);
    setTasks(newTasks);
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-300 w-screen h-screen flex items-center justify-center">
        <div className="bg-white py-10 px-16 flex flex-col gap-5 rounded-md shadow-xl mt-[100px] max-h-[600px] overflow-scroll">
          <div className="text-center">
            <input
              type="text"
              placeholder="Enter your task"
              className="border border-gray-200 rounded-md p-2 mr-2"
              onChange={handleChange}
              name="desc"
              value={inputs.desc}
            />
            <button
              className="bg-gray-200 py-2 px-5 text-gray-900 rounded-md hover:bg-gray-300 duration-200"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {tasks.map((task, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-5"
                >
                  <p className="text-gray-500 text-sm">
                    {moment(task.date).fromNow()}
                  </p>
                  <p>{task.desc}</p>
                  <div>
                    <button
                      className="bg-red-300 text-white py-1 px-3 rounded-md hover:bg-red-400 duration-200"
                      onClick={() => handleDelete(task, index)}
                    >
                      done
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
