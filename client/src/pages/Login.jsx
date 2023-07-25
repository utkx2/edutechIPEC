import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from '../assets/login.jpg'
import { BASE_URL } from "../config";

const Login = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        identifier: "",
        userPassword: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!formData.identifier || !formData.userPassword) {
            setErrorMessage("Please enter both email/mobile number and password.");
            return;
        }
        // Make API request to login
        fetch(`${BASE_URL}user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    setErrorMessage(data.errors.message || "An error occurred.");
                } else {
                    // Store response in local storage
                    localStorage.setItem("token", JSON.stringify(data.token));
                    // Navigate to the desired page
                    const user = data.data;
                    console.log(data);
                    localStorage.setItem("user", JSON.stringify(user));
                    if (user.userRole === "admin") {
                        navigate("/dashboard/users");
                    } else {
                        navigate("/");
                    }
                }
            })
            .catch((error) => {
                // Handle error
                console.error(error);
                setErrorMessage("An error occurred during login.");
            });
    };

    return (
        <>
            <div className='flex items-center justify-center w-full p-4 py-10 bg-[#d1e9f9]'>
                <div>
                    <div className="max-w-[1444px] border py-6 px-12 shadow-lg bg-white">

                        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>
                            LOGIN
                        </h1>
                        <div className="flex flex-col gap-4 p-6 px-4 py-8 mx-auto mt-6 md:flex-row">
                            <div className="w-full m-2 mb-4 md:w-1/2 md:mb-0">
                                <img className="w-80" src={LoginImg} alt="login" />
                            </div>
                            <div className="w-full m-2 md:w-1/2">
                                <form onSubmit={handleLogin}>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            type="email"
                                            name="identifier"
                                            id="floating_email"
                                            value={formData.identifier}
                                            onChange={handleInputChange}
                                            className="block w-full px-0 pt-4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="floating_email"
                                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            style={{
                                                zIndex: 1
                                            }}
                                        >
                                            Email or Mobile Number
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            type="password"
                                            name="userPassword"
                                            id="floating_password"
                                            value={formData.userPassword}
                                            onChange={handleInputChange}
                                            className="block w-full px-0 pt-4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="floating_password"
                                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            style={{
                                                zIndex: 1
                                            }}
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            type="submit"
                                            className="text-white bg-[#1f1d5a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Sign In
                                        </button>
                                        <a
                                            className="text-sm font-medium text-[#1f1d5a] cursor-pointer hover:text-red-800"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                    {errorMessage && (
                                        <div className="mb-4 text-red-500">{errorMessage}</div>
                                    )}
                                </form>
                                <div className="mt-10 text-center">
                                    Do not have an account?{" "}
                                    <Link
                                        to="/signup"
                                        className="text-sm font-medium text-[#1f1d5a] hover:text-red-800"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;