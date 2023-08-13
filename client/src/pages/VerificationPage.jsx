// VerificationPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../config";
import axios from "axios";

const VerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [verificationStatus, setVerificationStatus] = useState(false);
    const location = useLocation();
    const formData = location.state;
    const navigate = useNavigate();
    // console.log(formData);

    const handleVerify = () => {
        // Implement the logic to verify the OTP here.
        // You can send the entered OTP to the server for verification.
        // For this example, we'll just log the entered OTP to the console.
        const requestBody = {
            otp: otp,
        };

        // Make a POST request to the API
        //    console.log(localStorage.getItem("token"));
        axios
            .post(`${BASE_URL}user/verify`, requestBody)
            .then((response) => {
                // Handle the API response
                // console.log(response.data);
                // console.log(response.data.status);
                setVerificationStatus(true);
                if (response.data.status) {
                    fetch(`${BASE_URL}user/signup`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        info: JSON.stringify(formData)
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // Handle response data
                            // console.log(data);
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
                }
                else {
                    alert('Invalid OTP');
                    navigate("/signup");
                }
            })
            .catch((error) => {
                console.error('Error verifying OTP:', error);
                // Handle error if needed
            });

        // console.log('Entered OTP:', otp);

    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-md mx-auto bg-white px-16 py-16 mt-20 shadow-lg rounded-lg p-6">
                <div className=''>
                    <h1 className="text-2xl font-bold mb-4">OTP Verification</h1>
                    <p className="mb-2">Enter the OTP sent to your email:</p>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                    />
                    <button
                        onClick={handleVerify}
                        className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Verify
                    </button>
                    {errorMessage && (
                        <div className="mb-4 text-red-500">{errorMessage}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
