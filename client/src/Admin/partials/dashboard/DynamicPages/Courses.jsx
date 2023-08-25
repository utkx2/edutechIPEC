import React from 'react'
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from '../../../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Courses() {

    const [formData, setFormData] = useState({
        Title: "",
        AdmissionMode: "",
        CourseCode: "",
        CommencementDate: "",
        Phases: "",
        ClassesFrequency: "",
        ClassSchedule: "",
        StudyContent: "",
        ComprehensivePractice: "",
        price: "",
        discount: ""
    });

    const clearInputs = () => {
        setFormData({
            Title: "",
            AdmissionMode: "",
            CourseCode: "",
            CommencementDate: "",
            Phases: "",
            ClassesFrequency: "",
            ClassSchedule: "",
            StudyContent: "",
            ComprehensivePractice: "",
            price: "",
            discount: ""
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        const token = localStorage.getItem("token");

        const requestBody = JSON.stringify(formData);

        fetch(`${BASE_URL}Courses/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: token,
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("success", data);
                toast.success("Submitted successfully");
                clearInputs();
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Oops! Something went wrong");
            });
    };

    const calculateDiscountedPrice = () => {
        const price = parseFloat(formData.price);
        const discount = parseFloat(formData.discount);
        if (!isNaN(price) && !isNaN(discount)) {
            const discountedPrice = price - (price * discount) / 100;
            return discountedPrice.toFixed(2); // Rounding to 2 decimal places
        }
        return '';
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden ">
            {/* Sidebar */}

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                <main>

                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                        <div className="container p-6 mx-auto overflow-x-auto font-mono">
                            {/*---------> Table (Top Channels) */}

                            <h1 className="mb-4 text-2xl font-bold">ADD Course</h1>
                            <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl border-[2px] border-black">
                                <form onSubmit={handleSubmit}>
                                    <div className="p-2 rounded-lg">
                                        <div>

                                            <label className="relative block mb-2 font-semibold">
                                                Title
                                                <input
                                                    required
                                                    type="text"
                                                    name="Title"
                                                    value={formData.Title}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Title"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                AdmissionMode
                                                <input
                                                    required
                                                    type="text"
                                                    name="AdmissionMode"
                                                    value={formData.AdmissionMode}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter AdmissionMode"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                CourseCode
                                                <input
                                                    required
                                                    type="text"
                                                    name="CourseCode"
                                                    value={formData.CourseCode}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter CourseCode"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                CommencementDate
                                                <input
                                                    required
                                                    type="date"
                                                    name="CommencementDate"
                                                    value={formData.CommencementDate}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter CommencementDate"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                Phases
                                                <input
                                                    required
                                                    type="text"
                                                    name="Phases"
                                                    value={formData.Phases}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Phases"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                ClassesFrequency
                                                <input
                                                    required
                                                    type="text"
                                                    name="ClassesFrequency"
                                                    value={formData.ClassesFrequency}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter ClassesFrequency"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                ClassSchedule
                                                <input
                                                    required
                                                    type="text"
                                                    name="ClassSchedule"
                                                    value={formData.ClassSchedule}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter ClassSchedule"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                StudyContent
                                                <input
                                                    required
                                                    type="text"
                                                    name="StudyContent"
                                                    value={formData.StudyContent}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter StudyContent"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                ComprehensivePractice
                                                <input
                                                    required
                                                    type="text"
                                                    name="ComprehensivePractice"
                                                    value={formData.ComprehensivePractice}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter ComprehensivePractice"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                Price (Before discount)
                                                <input
                                                    required
                                                    type="text"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Price"
                                                />
                                            </label>

                                            <label className="relative block mb-2 font-semibold">
                                                Discount (%)
                                                <input
                                                    required
                                                    type="text"
                                                    name="discount"
                                                    value={formData.discount}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Discount (%)"
                                                />
                                            </label>

                                            <div>
                                                <strong>Price After Discount: </strong>
                                                {calculateDiscountedPrice()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-3/4">

                                        <button
                                            type="submit"
                                            className="bg-[#182235] hover:bg-[#111a2b] mx-6 text-white px-4 py-2 mt-8 rounded-lg font-semibold w-2/4"
                                        >
                                            Submit
                                        </button>

                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}


