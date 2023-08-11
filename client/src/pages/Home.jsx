import { useState } from "react";

function Home() {
  //   const tasks = ["task 1", "task 2"];
  const [tasks, setTasks] = useState(["task 1", "task 2"]);
  const [inputs, setInputs] = useState("");

  const handleTask = (e) => {
    setInputs(e.target.value);
  };
  console.log(inputs);

  const handleAdd = () => {
    setTasks((prev) => [...prev, inputs]);
    setInputs("");
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <>
      <div className="bg-slate-300 w-screen h-screen flex items-center justify-center">
        <div className="bg-white p-10 flex justify-center items-center flex-col gap-5">
          <div>
            <input
              type="text"
              placeholder="enter your task"
              className="border border-gray-200 rounded-md p-2 mr-2"
              onChange={handleTask}
              value={inputs}
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
                  <p>{task}</p>
                  <div>
                    <button className="bg-blue-300 py-1 px-2 rounded-md mr-2">
                      Edit
                    </button>
                    <button
                      className="bg-red-300 py-1 px-2 rounded-md"
                      onClick={() => handleDelete(index)}
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
