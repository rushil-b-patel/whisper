import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"; 
import axios from "axios";
const Register = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const { email, username, password } = input;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInput({...input, [name]:value});
    }
    
    const handleError = (err) => {
        toast.error(err, {position:"top-left"}); 
    }
    const handleSucess = (err) => {
        toast.success(err, {position:"top-right"});
    }

    const handleSubmit = async (e) => {
        console.log("In handlesubmit")
        try{
            e.preventDefault();
            const res = await axios.post('http://localhost:3000/register', input, {withCredentials:true});
            console.log(res);
            const {success, message} = res.data;
            if(success){
                handleSucess(message);
                setTimeout(()=>{
                    navigate('/');
                },1000)
            }
            else{
                handleError(message);
            }
        }catch(error){
            handleError(error);
        }
        setInput({
            ...input,
            email:"",
            username:"",
            password:""
        });
    }
            
    const handleGoogleRegister = () => {
        // Handle Google register logic here
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="rounded-lg border border-gray-300 mx-auto px-5 max-w-sm w-full">
                <div className="text-xl font-bold text-center my-5">
                    Register in Whisper
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-4 flex items-center">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-black w-1/4 mr-5"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            className="ml-2 mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            placeholder="Enter your email"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="my-4 flex items-center">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-black w-1/4 mr-5"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            className="ml-2 mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            placeholder="Enter your username"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="my-4 flex items-center">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-black w-1/4 mr-5"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            className="ml-2 mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="my-4 flex items-center">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-black w-1/4 mr-5"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            className="ml-2 mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            placeholder="Confirm your password"
                            onChange={handleConfirmPassword}
                        />
                    </div>
                    <div className="mt-5 flex justify-center">
                        <button
                            type="submit"
                            className="text-black text-sm bg-neutral-100 hover:bg-neutral-200 focus:outline-none text-center align-middle px-3 rounded-sm border-2 border-[#767676]"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-right text-sm mt-2">
                        <span
                            onClick={handleGoogleRegister}
                            className="text-fuchsia-800 cursor-pointer hover:underline"
                        >
                            Register with Gmail
                        </span>
                    </div>
                </form>
            </div>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default Register;