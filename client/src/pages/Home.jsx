import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import NavBar from "../components/navBar";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [inputs, setInputs] = useState({ desc: "" });

  const postedDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  console.log(postedDate);
  const lag = moment(postedDate).fromNow();
  console.log(lag);

  const fetchApi = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/tasks", {
        withCredentials: true,
      });
      const data = res.data;
      setTasks(data);
      console.log(data);
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
  console.log(inputs);

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/tasks/add",
        inputs,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      await fetchApi();
      setInputs({ desc: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (task) => {
    const taskId = task.id;
    console.log(taskId);
    try {
      const res = await axios.delete(
        "http://localhost:8800/api/tasks/delete/" + taskId
      );
      console.log(res);
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
        <div className="bg-white p-10 flex justify-center items-center flex-col gap-5">
          <div>
            <input
              type="text"
              placeholder="enter your task"
              className="border border-gray-200 rounded-md p-2 mr-2"
              onChange={handleChange}
              name="desc"
              value={inputs.desc}
            />
            <button className="bg-gray-200 p-2 rounded-md" onClick={handleAdd}>
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
                  <p>{task.desc}</p>
                  <div>
                    <button className="bg-blue-300 py-1 px-2 rounded-md mr-2">
                      Edit
                    </button>
                    <button
                      className="bg-red-300 py-1 px-2 rounded-md"
                      onClick={() => handleDelete(task, index)}
                    >
                      Delete
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
