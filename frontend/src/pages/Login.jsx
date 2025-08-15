import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        className="flex flex-col gap-4 p-6 sm:p-8 min-w-[340px] sm:min-w-[400px] border rounded-xl text-sm shadow-xl bg-white"
        onSubmit={onSubmitHandler}
      >
        <h2 className="text-2xl font-semibold text-gray-700">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-gray-500 text-sm mb-2">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an appointment.
        </p>

        {state === "Sign Up" && (
          <div className="flex flex-col w-full">
            <label className="text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        <div className="flex flex-col w-full">
          <label className="text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium mt-2 transition"
        >
          {state === "Sign Up" ? "Sign Up" : "Login"}
        </button>

        <p className="text-sm text-gray-600 mt-2">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-blue-500 font-medium cursor-pointer hover:underline"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
