function Login() {
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
            />
            <input
              className="py-2 px-4 border border-gray-300 rounded-md"
              type="password"
              placeholder="password"
            />
            <button className="bg-green-300 py-2 px-4 rounded-md">Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
