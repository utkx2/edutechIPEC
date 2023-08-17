import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpImg from '../assets/signup.jpg'
import { BASE_URL } from '../config';
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
        className: '',
    });
    const [errorMessage, setErrorMessage] = useState('')

    const handleClassChange = (event) => {
        const selectedClass = event.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            className: selectedClass,
        }));
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        // Make API request with form data
        // console.log(localStorage.getItem("token"));
        const info = {
            email: formData.email,
            password: formData.password
        }

        fetch(`${BASE_URL}user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                auth: localStorage.getItem("token"),
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status) {
                    axios
                        .post(`${BASE_URL}user/sendMail/`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                auth: localStorage.getItem("token"),
                            },
                            info: (info)
                        }).then((response) => {
                            // console.log(response.data);
                            if (!response.data.status) {
                                // navigate("/verify-otp", { state: formData });
                                console.log("error");
                            }
                        }
                        )
                }
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    // Store response in local storage
                    localStorage.setItem("token", (data.token));
                    // Navigate to the desired page
                    const user = data.user
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("/");
                }
            })
            .catch((error) => {
                // Handle error
                console.log(error);
            });

    };
    // navigate("/verify-otp");

    return (
        <>
            <div className='flex items-center justify-center w-full p-4 py-10 bg-[#d1e9f9] text-black'>
                <div>


                    <div className="p-6 bg-white border shadow-lg max-w-7xl">

                        <h1 className=' text-3xl text-[#1f1d5a] font-bold text-center'>
                            REGISTER FORM
                        </h1>

                        <div className="flex flex-col gap-4 p-6 px-4 py-8 mx-auto mt-6 md:flex-row">
                            <div className="w-full mb-4 md:w-1/2 md:mb-0">
                                <img
                                    className='w-full h-auto'
                                    src={SignUpImg}
                                    alt="Illustration"
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-black">
                                {/* <div className="flex"> */}
                                <div className="w-1/2">
                                    <form onSubmit={handleSubmit}>

                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                type="text"
                                                name="name"
                                                id="floating_name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="block w-full px-0 pt-4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=""
                                                required
                                            />
                                            <label
                                                htmlFor="floating_name"
                                                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                style={{
                                                    zIndex: 1
                                                }}
                                            >
                                                Name
                                            </label>
                                        </div>

                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                type="email"
                                                name="email"
                                                id="floating_email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full px-0 pt-4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                                                Email
                                            </label>
                                        </div>

                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                type="number"
                                                name="mobileNumber"
                                                id="floating_mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleChange}
                                                className="block w-full px-0 pt-4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=""
                                                required
                                            />
                                            <label
                                                htmlFor="floating_mobileNumber"
                                                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                style={{
                                                    zIndex: 1
                                                }}
                                            >
                                                Phone Number
                                            </label>
                                        </div>

                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                type="password"
                                                name="password"
                                                id="floating_password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="block w-full px-0 pt-4 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                                        <div className='mb-6 '>
                                            <label htmlFor="classSelector" className=' mr-2'>Select a Class:</label>
                                            <select id="classSelector" onChange={handleClassChange}>
                                                <option value="">Select</option>
                                                <option value="class 6">Class 6</option>
                                                <option value="class 7">Class 7</option>
                                                <option value="class 8">Class 8</option>
                                                <option value="class 9">Class 9</option>
                                                <option value="class 10">Class 10</option>
                                                <option value="class 11">Class 11</option>
                                                <option value="class 12">Class 12</option>
                                                <option value="JEE">JEE</option>
                                                <option value="NEET">NEET</option>
                                            </select>
                                        </div>


                                        <div className="flex items-center justify-between w-full mb-4">
                                            <button
                                                className="text-white bg-[#1f1d5a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                                type="submit"
                                            >
                                                Sign Up
                                            </button>
                                        </div>

                                        {errorMessage && (
                                            <div className="mb-4 text-red-500">{errorMessage}</div>
                                        )}
                                    </form>
                                </div>

                                {/* </div> */}
                                <div className="text-center">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-[#1f1d5a] hover:text-red-800 text-sm font-medium">
                                        Login
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

export default Signup;

