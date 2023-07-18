import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpImg from '../assets/signup.jpg'
// import { locations } from "../constants/countriesData"

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

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
        // fetch(`${process.env.BASE_URL}/api/auth/register`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Handle response data
        //         console.log(data);
        //         if (data.error) {
        //             if (data.error.email) alert(data.error.email);
        //             if (data.error.phoneNumber) alert(data.error.phoneNumber);
        //         } else {
        //             setSuccessMessage(data.success);
        //             // Clear input fields
        //             setFormData({
        //                 name: '',
        //                 email: '',
        //                 password: '',
        //                 phoneNumber: ''
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         // Handle error
        //         console.log(error);
        //     });
    };

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
                                            type="text"
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
                                 
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                    className="text-white bg-[#1f1d5a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            type="submit"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
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

