import React from 'react'
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Disclosure } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

export default function SamplePaper() {
    const [formData, setFormData] = useState({
        class6: '',
        class7: '',
        class8: '',
        class9: '',
        class10: '',
        class11: '',
        class12: '',
        class13: '',
    });

    const clearInputs = () => {
        setFormData({
            class6: '',
            class7: '',
            class8: '',
            class9: '',
            class10: '',
            class11: '',
            class12: '',
            class13: '',
        });
    }

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
        console.log(formData)

        const token = localStorage.getItem("token");

        const requestBody = JSON.stringify(formData);

        // fetch(`${BASE_URL}/api/home/upload`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         auth: token,
        //     },
        //     body: requestBody,
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         alert("Added")
        //         clearInputs();
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //         alert("Oops something went wrong!!!");
        //     });
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
                <div className="p-6 mx-auto overflow-x-auto font-mono ">
                    {/*---------> Table (Top Channels) */}

                    <h1 className="mb-4 text-2xl font-bold">Sample Papers</h1>
                    <div className="px-4 py-8 mt-6 mb-6 border-[1px] border-black/20 rounded-lg shadow-xl">
                        {/* <form onSubmit={handleSubmit}> */}
                            {/* Global Section */}
                            {/* <h2 className="mb-4 text-2xl font-bold text-center "></h2> */}
                            {/* <p className="font-serif text-sm font-thin text-red-700">
                                Fields marked with an asterisk (*) are mandatory.
                            </p> */}
                            <h1 className="p-2 mb-4 text-xl font-bold">Home Carousel Links</h1>
                            <div className="grid grid-cols-1 gap-8">
    
                                
                                <div className='border border-black rounded-lg'>


                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                <span>CLASS VI ( CLASS 6th )</span>
                                                <FontAwesomeIcon icon={faArrowCircleUp} className={`${
                                                    open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 `} />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                <input
                                                    type="text"
                                                    name="class6"
                                                    value={formData.class6}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Add link"
                                                    required
                                                />
                                                <button onClick={handleSubmit} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                    Upload
                                                </button>
                                            </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>

                                <div className='border rounded-lg'>

                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                <span>CLASS VII ( CLASS 7th )</span>
                                                <FontAwesomeIcon icon={faArrowCircleUp} className={`${
                                                    open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 `} />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                <input
                                                    type="text"
                                                    name="class7"
                                                    value={formData.class7}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                    placeholder="Add link"
                                                    required
                                                />
                                                <button onClick={handleSubmit} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                    Upload
                                                </button>
                                            </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    </div>

                                    <div className='border rounded-lg'>

                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                    <span>CLASS VIII ( CLASS 8th )</span>
                                                    <FontAwesomeIcon icon={faArrowCircleUp} className={`${
                                                        open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 `} />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                    <input
                                                        type="text"
                                                        name="class8"
                                                        value={formData.class8}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Add link"
                                                        required
                                                    />
                                                    <button className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                        Upload
                                                    </button>
                                                </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>

                                    <div className='border rounded-lg'>

                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                    <span>CLASS IX ( CLASS 9th )</span>
                                                    <FontAwesomeIcon icon={faArrowCircleUp} className={`${
                                                        open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 `} />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                    <input
                                                        type="text"
                                                        name="class9"
                                                        value={formData.class9}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Add link"
                                                        required
                                                    />
                                                    <button className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                        Upload
                                                    </button>
                                                </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>

                                    <div className='border rounded-lg'>

                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                    <span>CLASS X ( CLASS 10th )</span>
                                                    <FontAwesomeIcon icon={faArrowCircleUp} className={`${
                                                        open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 `} />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                    <input
                                                        type="text"
                                                        name="class10"
                                                        value={formData.class10}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Add link"
                                                        required
                                                    />
                                                    <button className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                        Upload
                                                    </button>
                                                </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>

                                    <div className='border rounded-lg'>

                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                    <span>CLASS XI ( CLASS 11th )</span>
                                                    <FontAwesomeIcon icon={faArrowCircleUp} className={`${
                                                        open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 `} />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                    <input
                                                        type="text"
                                                        name="class11"
                                                        value={formData.class11}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Add link"
                                                        required
                                                    />
                                                    <button className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                        Upload
                                                    </button>
                                                </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>

                                    <div className='border rounded-lg'>

                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                    <span>CLASS XII ( CLASS 12th )</span>
                                                    <FontAwesomeIcon icon={faArrowCircleUp} className={`${
                                                        open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 `} />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                    <input
                                                        type="text"
                                                        name="class12"
                                                        value={formData.class12}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Add link"
                                                        required
                                                    />
                                                    <button className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                        Upload
                                                    </button>
                                                </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>

                                    <div className='border rounded-lg'>

                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                    <span>CLASS XII PASS ( CLASS 12th PASS )</span>
                                                    <FontAwesomeIcon icon={faArrowCircleUp} className={`${
                                                        open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 `} />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                    <input
                                                        type="text"
                                                        name="class13"
                                                        value={formData.class13}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                        placeholder="Add link"
                                                        required
                                                    />
                                                    <button className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                        Upload
                                                    </button>
                                                </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>

                            </div>
                        {/* </form> */}

                    </div>

                </div>
            </div>
        </main>

    </div>
</div>
  )
}