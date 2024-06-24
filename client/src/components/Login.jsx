import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { email, password } = input;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const handleError = (err) => {
    toast.error(err, { position: "bottom-left" });
  }
  const handleSucess = (err) => {
    toast.success(err, { position: "bottom-right" });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', ...input, { withCredentials: true });
      const { success, message } = res;
      if (success) {
        handleSucess(message);
        setTimeout(() => {
          navigate('/');
        }, 1000)
      }
      else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
    setInput({
      ...input,
      email: "",
      password: ""
    });
  }

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="rounded-lg border border-gray-300 mx-auto px-5 max-w-sm w-full">
        <div className="text-xl font-bold text-center my-5">
          Login into Whisper
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4 flex items-center">
            <label
              htmlFor="handleOrEmail"
              className="block text-sm font-medium black w-1/4 mr-5"
            >
              Handle/Email
            </label>
            <input
              id="handleOrEmail"
              name="handleOrEmail"
              value={email}
              type="text"
              className="ml-2 mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Enter your handle or email"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black w-1/4 mr-7"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              value={password}
              type="password"
              className="ml-2 mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <div className="text-right text-sm">
            <a className="text-blue-500 underline cursor-pointer">
              Forgot your password?
            </a>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              type="submit"
              className="text-black text-sm bg-neutral-100 hover:bg-neutral-200 focus:outline-none text-center align-middle px-3 rounded-sm border-2 border-[#767676]"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-right text-sm mt-2">
          <span
            onClick={handleGoogleLogin}
            className="text-fuchsia-800 cursor-pointer hover:underline"
          >
            Use Gmail
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;