import React from 'react'
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from '../../../../config'; 

export default function WHY() {
  const [whyIPEC, setWhyIPEC] = useState()
  const [whyIPECContent, setWhyIPECContent] = useState()

  const [whyIPECReasons, setWhyIPECReasons] = useState({
    reason1: '',
    reason2: '',
    reason3: '',
    reason4: '',
    reason5: '',
    reason6: '',
  })

const handleChange = (e) => {
    const { name, value } = e.target;
    setWhyIPECReasons((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    // const ipecAdvantagesArr = [
    //     {
    //         title: ipecAdvantages.title1,
    //         description: ipecAdvantages.desc1
    //     },
    //     {
    //         title: ipecAdvantages.title2,
    //         description: ipecAdvantages.desc2
    //     },
    //     {
    //         title: ipecAdvantages.title3,
    //         description: ipecAdvantages.desc4
    //     },
    //     {
    //         title: ipecAdvantages.title4,
    //         description: ipecAdvantages.desc4
    //     }
    // ]
    console.log(Object.values(whyIPECReasons))

    const formData = {
      Title: whyIPEC,
      Content: whyIPECContent,
      Reasons: Object.values(whyIPECReasons)
    }
    
    const token = localStorage.getItem("token");

    const requestBody = JSON.stringify(formData);

    fetch(`${BASE_URL}/api/whyIPEC/upload`, {
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
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto ">
                <main>
    
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl ">
                        <div className="container p-6 mx-auto overflow-x-auto font-mono">
                            {/*---------> Table (Top Channels) */}

                            <h1 className="mb-4 text-2xl font-bold">WHY IPEC</h1>
                            <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl border-[2px] border-black">
                                <form onSubmit={handleSubmit}>
                                    {/* Global Section */}
                                      <div className="p-2 rounded-lg">
                                        <h1 className="mb-4 text-xl font-bold">Why Title</h1>
                                          <textarea
                                              type="text"
                                              name="why"
                                              value={whyIPEC}
                                              onChange={(e) => setWhyIPEC(e.target.value)}
                                              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                              placeholder="Enter About Desc"
                                              required
                                          />
                                      </div>

                                      <div className="p-2 rounded-lg">
                                        <h1 className="mb-4 text-xl font-bold">WHY para content</h1>
                                          <textarea
                                              type="text"
                                              name="whyabout"
                                              value={whyIPECContent}
                                              onChange={(e) => setWhyIPECContent(e.target.value)}
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
                                                    name="reason1"
                                                    value={whyIPECReasons.reason1}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="reason1"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="reason2"
                                                    value={whyIPECReasons.reason2}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="reason2"
                                                    required
                                                />
                                                
                                                <input
                                                    type="text"
                                                    name="reason3"
                                                    value={whyIPECReasons.reason3}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="reason3"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="reason4"
                                                    value={whyIPECReasons.reason4}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="reason4"
                                                    required
                                                />
                                                
                                                <input
                                                    type="text"
                                                    name="reason5"
                                                    value={whyIPECReasons.reason5}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="reason5"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="reason6"
                                                    value={whyIPECReasons.reason6}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="reason6"
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
