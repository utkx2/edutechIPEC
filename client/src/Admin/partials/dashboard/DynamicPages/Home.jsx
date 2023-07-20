import React from 'react'
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";

export default function Home() {

    const [formData, setFormData] = useState({
        pnr: "",
        companyname: "",
        detail: "",
        value: "",
        status: "",
        country: "",
        state: "",
        city: "",
        sector: ""
    });

    const clearInputs = () => {
        setFormData({
            pnr: "",
            companyname: "",
            detail: "",
            value: "",
            status: "",
            country: "",
            state: "",
            city: "",
            sector: ""
        });
    }

    const [carouselLinks, setCarouselLinks] = useState([
        {name: 'link1', value: ''}
    ])

    // const handle

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const requestBody = JSON.stringify(formData);

        fetch(`${BASE_URL}/api/home/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: token,
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Added")
                clearInputs();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Oops something went wrong!!!");
            });
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

                            <h1 className="mb-4 text-xl font-bold">Home</h1>
                            <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-2xl">
                                <form onSubmit={handleSubmit}>
                                    {/* Global Section */}
                                    {/* <h2 className="mb-4 text-2xl font-bold text-center "></h2> */}
                                    {/* <p className="font-serif text-sm font-thin text-red-700">
                                        Fields marked with an asterisk (*) are mandatory.
                                    </p> */}
                                    <div className="p-2 rounded-lg">
                                        <h1 className="mb-4 text-xl font-bold">Home Carousel Links</h1>
                                        <div>
                                            
                                        <label className="relative block mb-2 font-semibold">
                                            Carousel Link
                                            <span className="relative top-0 right-0 text-red-700">*</span>
                                            <input
                                                required
                                                type="text"
                                                name="pnr"
                                                value={formData.pnr}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Enter PNR"
                                            />
                                        </label>

                                        <button className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                            Add more
                                        </button>
                                        </div>
                                        {/* <div className="grid grid-cols-2 gap-4 ">
                                            <div className="relative">
                                                <label className="block mb-2 font-semibold">
                                                    Company Name
                                                    <span className="relative top-0 right-0 text-red-700">*</span>
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="companyname"
                                                    value={formData.companyname}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Name"
                                                />
                                            </div>

                                            <label className="block mb-2 font-semibold">
                                                Project Detail
                                                <input
                                                    required
                                                    type="text"
                                                    name="detail"
                                                    value={formData.detail}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Detail"
                                                />
                                            </label>

                                            <label className="block mb-2 font-semibold">
                                                Project Value
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                                <input
                                                    required
                                                    type="number"
                                                    name="value"
                                                    value={formData.value}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Value"
                                                />
                                            </label>
                                            <label className="block mb-2 font-semibold">
                                                Project Status
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                                <input
                                                    required
                                                    type="text"
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Status"
                                                />
                                            </label>
                                        </div> */}
                                    </div>

                                    {/* <div className="p-2 mt-2 rounded-lg ">
                                        <div className="grid grid-cols-2 gap-4">

                                            <label className="block mb-2 font-semibold">
                                                Country
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                                <select
                                                    required
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                >
                                                    <option value="">Select a country</option>
                                                    {countryNames.map((country) => (
                                                        <option key={country} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>

                                            <label className="block mb-2 font-semibold">
                                                Project State
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                                <select
                                                    required
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                >
                                                    <option value="">Select a state</option>
                                                    {stateNames.map((state) => (
                                                        <option key={state} value={state}>
                                                            {state}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>

                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-1.5 mb-1.5">

                                            <label className="block mb-2 font-semibold">
                                                City
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter a city"
                                                    autoComplete="off"
                                                    list="cityNamesList"
                                                />
                                                <datalist id="cityNamesList">
                                                    {cityNames.map((city) => (
                                                        <option key={city} value={city} />
                                                    ))}
                                                </datalist>
                                            </label>

                                            <label className="block font-semibold">
                                                Sector
                                                <span className="relative top-0 right-0 text-red-700">*</span>
                                                <input
                                                    required
                                                    type="text"
                                                    name="sector"
                                                    value={formData.sector}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Enter Sector"
                                                />
                                            </label>
                                        </div>

                                    </div> */}
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
