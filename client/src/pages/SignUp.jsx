import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpImg from '../assets/signup.jpg'
import { BASE_URL } from "../config";
// import { locations } from "../constants/countriesData"

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'user',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        // Make API request with form data
        fetch(`${BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle response data
                console.log(data);
                if (data.errors) {
                    setErrorMessage(data.errors[0].msg);
                } else {
                    setSuccessMessage(data.success);
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        phoneNumber: '',
                        role: 'user'
                    });
                }
            })
            .catch((error) => {
                // Handle error
                console.log(error);
            });
    };

    const userRole = ['user', 'admin']

    return (
        <>
            <div className='flex items-center justify-center w-full p-4 py-10 bg-[#d1e9f9]'>
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

                    <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                        {successMessage && (
                            <div className="mb-4 text-green-500">{successMessage}</div>
                        )}
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
                                            className="block w-full px-0 pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="floating_name"
                                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                                            className="block w-full px-0 pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="floating_email"
                                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Email
                                        </label>
                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            type="number"
                                            name="phoneNumber"
                                            id="floating_phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="block w-full px-0 pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="floating_phoneNumber"
                                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                                            className="block w-full px-0 pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="floating_password"
                                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Password
                                        </label>
                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">
                                        <select required
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            id="floating_role"
                                            className="block w-full px-0 pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        >
                                            {userRole.map((userRole, index) => (
                                                <option key={index} value={userRole}>
                                                    {userRole}
                                                </option>
                                        ))}
                                        </select>
                                        <label
                                            htmlFor="floating_role"
                                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Role
                                        </label>
                                    </div>

                                    {/* <div className="mb-4">
                                    <label className="block font-semibold">
                                        Role
                                        <span className="relative top-0 right-0 text-red-700">*</span>
                                        <select required
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="block w-full px-0 pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            >
                                            {userRole.map((userRole, index) => (
                                                <option key={index} value={userRole}>
                                                    {userRole}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div> */}
                                 
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

