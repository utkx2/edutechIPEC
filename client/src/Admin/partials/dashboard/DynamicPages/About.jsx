import React from 'react'

import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from '../../../../config';

export default function About() {
    const [aboutIPEC, setAboutIPEC] = useState()

    const [ipecAdvantages, setIpecAdvantages] = useState({
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        desc1: '',
        desc2: '',
        desc3: '',
        desc4: ''
    })

    const [ipecPedagogy, setIpecPedagogy] = useState({
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        desc1: '',
        desc2: '',
        desc3: '',
        desc4: ''
    })


    const handleChangePedagogy = (e) => {
        const { name, value } = e.target;
        setIpecPedagogy((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleChangeAdvantage = (e) => {
        const { name, value } = e.target;
        setIpecAdvantages((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ipecAdvantages, ipecPedagogy, aboutIPEC)
        const ipecAdvantagesArr = [
            {
                title: ipecAdvantages.title1,
                description: ipecAdvantages.desc1
            },
            {
                title: ipecAdvantages.title2,
                description: ipecAdvantages.desc2
            },
            {
                title: ipecAdvantages.title3,
                description: ipecAdvantages.desc4
            },
            {
                title: ipecAdvantages.title4,
                description: ipecAdvantages.desc4
            }
        ]

        const ipecPedagogyArr = [
            {
                title: ipecPedagogy.title1,
                description: ipecPedagogy.desc1
            },
            {
                title: ipecPedagogy.title2,
                description: ipecPedagogy.desc2
            },
            {
                title: ipecPedagogy.title3,
                description: ipecPedagogy.desc4
            },
            {
                title: ipecPedagogy.title4,
                description: ipecPedagogy.desc4
            }
        ]

        const formData = {
            AboutIPEC: aboutIPEC,
            ipecAdvantages: ipecAdvantagesArr,
            ipecPedagogy: ipecPedagogyArr
        }

        const token = localStorage.getItem("token");

        const requestBody = JSON.stringify(formData);

        fetch(`${BASE_URL}AboutIpec/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: token,
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("success", data);
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Oops something went wrong!!!");
            });
    };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // {
    //     "AboutIPEC": "IPEC is a leading educational institution...",
    //         "ipecAdvantages": [
    // {
    //     "title": "",
    //     "description": ""
    // },
    //             {
    //                 "title": "State-of-the-Art Infrastructure",
    //                 "description": "We provide modern classrooms and labs..."
    //             }
    //         ],
    //             "ipecPedagogy": [
    //                 {
    //                     "title": "Interactive Learning",
    //                     "description": "We emphasize interactive learning methodologies..."
    //                 },
    //                 {
    //                     "title": "Project-Based Learning",
    //                     "description": "Students work on real-world projects..."
    //                 }
    //             ]
    // }
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

                            <h1 className="mb-4 text-2xl font-bold">About</h1>
                            <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl  border-[2px] border-black">
                                <form onSubmit={handleSubmit}>
                                    {/* Global Section */}
                                    <div className="p-2 rounded-lg">
                                        <h1 className="mb-4 text-xl font-bold">About content section paragraph</h1>
                                        <textarea
                                            type="text"
                                            name="title"
                                            onChange={(e) => setAboutIPEC(e.target.value)}
                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                            placeholder="Enter About Desc"
                                            required
                                        />
                                    </div>

                                    <div className="p-2 rounded-lg">
                                        <h1 className="mb-4 text-xl font-bold">IPEC Advantaged Card Details</h1>
                                        <div className='flex flex-col gap-y-1'>
                                            <input
                                                type="text"
                                                name="title1"
                                                value={ipecAdvantages.title1}
                                                onChange={handleChangeAdvantage}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Title1"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="desc1"
                                                value={ipecAdvantages.desc1}
                                                onChange={handleChangeAdvantage}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Desc1"
                                                required
                                            />

                                            <input
                                                type="text"
                                                name="title2"
                                                value={ipecAdvantages.title2}
                                                onChange={handleChangeAdvantage}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Title2"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="desc2"
                                                value={ipecAdvantages.desc2}
                                                onChange={handleChangeAdvantage}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Desc2"
                                                required
                                            />

                                            <input
                                                type="text"
                                                name="title3"
                                                value={ipecAdvantages.title3}
                                                onChange={handleChangeAdvantage}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Title3"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="desc3"
                                                value={ipecAdvantages.desc3}
                                                onChange={handleChangeAdvantage}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Desc3"
                                                required
                                            />


                                            <input
                                                type="text"
                                                name="title4"
                                                value={ipecAdvantages.title4}
                                                onChange={handleChangeAdvantage}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Title4"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="desc4"
                                                value={ipecAdvantages.desc4}
                                                onChange={handleChangeAdvantage}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Desc4"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="p-2 mt-4 rounded-lg">
                                        <h1 className="mb-4 text-xl font-bold">IPEC Pedagogy Card Details</h1>
                                        <div className='flex flex-col gap-y-1'>
                                            <input
                                                type="text"
                                                name="title1"
                                                value={ipecPedagogy.title1}
                                                onChange={handleChangePedagogy}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Title1"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="desc1"
                                                value={ipecPedagogy.desc1}
                                                onChange={handleChangePedagogy}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Desc1"
                                                required
                                            />

                                            <input
                                                type="text"
                                                name="title2"
                                                value={ipecPedagogy.title2}
                                                onChange={handleChangePedagogy}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Title2"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="desc2"
                                                value={ipecPedagogy.desc2}
                                                onChange={handleChangePedagogy}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Desc2"
                                                required
                                            />

                                            <input
                                                type="text"
                                                name="title3"
                                                value={ipecPedagogy.title3}
                                                onChange={handleChangePedagogy}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Title3"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="desc3"
                                                value={ipecPedagogy.desc3}
                                                onChange={handleChangePedagogy}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Desc3"
                                                required
                                            />


                                            <input
                                                type="text"
                                                name="title4"
                                                value={ipecPedagogy.title4}
                                                onChange={handleChangePedagogy}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Title4"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="desc4"
                                                value={ipecPedagogy.desc4}
                                                onChange={handleChangePedagogy}
                                                className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                placeholder="Desc4"
                                                required
                                            />




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
