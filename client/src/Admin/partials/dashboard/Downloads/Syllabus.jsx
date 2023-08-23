import React from 'react'
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Disclosure } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../../../config'
import SyllabusPdfUploader from "./PdfUploader";

export default function Syllabus() {
    const [class6, setClass6] = useState();
    const [class7, setClass7] = useState();
    const [class8, setClass8] = useState();
    const [class9, setClass9] = useState();
    const [class10, setClass10] = useState();
    const [class11, setClass11] = useState();
    const [class12, setClass12] = useState();
    const [class13, setClass13] = useState();

    // const handle
    const handleSubmit = (className, fileLink) => {

        const token = localStorage.getItem("token");

        const requestBody = JSON.stringify({
            className,
            fileLink
        });

        fetch(`${BASE_URL}download/syllabus/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                auth: token,
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(
                    // data,
                    'success')
            })
            .catch((error) => {
                console.error("Error:", error);
                //  alert("Oops something went wrong!!!");
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
                        <div className="p-6 mx-auto overflow-x-auto font-mono ">
                            {/*---------> Table (Top Channels) */}

                            <h1 className="mb-4 text-2xl font-bold">Syllabus</h1>
                            <div className="px-4 py-8 mt-6 mb-6 border-[1px] border-black/20 rounded-lg shadow-xl">
                                {/* <form onSubmit={handleSubmit}> */}
                                {/* Global Section */}
                                {/* <h2 className="mb-4 text-2xl font-bold text-center "></h2> */}
                                {/* <p className="font-serif text-sm font-thin text-red-700">
                                Fields marked with an asterisk (*) are mandatory.
                            </p> */}
                                <div className="grid grid-cols-1 gap-8">


                                    <div className='border border-black rounded-lg'>


                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg text-left text-white text-bold bg-[#182235] rounded-lg border border-black ">
                                                        <span>CLASS VI ( CLASS 6th )</span>
                                                        <FontAwesomeIcon icon={faArrowCircleUp} className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 `} />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            name="class6"
                                                            value={class6}
                                                            onChange={(e) => setClass6(e.target.value)}
                                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Add link"
                                                            required
                                                        />
                                                        <SyllabusPdfUploader photos={class6} onChange={setClass6} index={0} />
                                                        <button onClick={() => handleSubmit(6, class6)} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                            Submit
                                                        </button>

                                                        {/* <a href="http://localhost:3000/uploads/1692727150102.pdf" download>Download</a> */}
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
                                                        <FontAwesomeIcon icon={faArrowCircleUp} className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 `} />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            name="class7"
                                                            value={class7}
                                                            onChange={(e) => setClass7(e.target.value)}
                                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Add link"
                                                            required
                                                        />
                                                        <SyllabusPdfUploader photos={class7} onChange={setClass7} index={0} />
                                                        <button onClick={() => handleSubmit(7, class7)} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                            Submit
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
                                                        <FontAwesomeIcon icon={faArrowCircleUp} className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 `} />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            name="class8"
                                                            value={class8}
                                                            onChange={(e) => setClass8(e.target.value)}
                                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Add link"
                                                            required
                                                        />
                                                        <SyllabusPdfUploader photos={class8} onChange={setClass8} index={0} />
                                                        <button onClick={() => handleSubmit(8, class8)} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                            Submit
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
                                                        <FontAwesomeIcon icon={faArrowCircleUp} className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 `} />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            name="class9"
                                                            value={class9}
                                                            onChange={(e) => setClass9(e.target.value)}
                                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Add link"
                                                            required
                                                        />
                                                        <SyllabusPdfUploader photos={class9} onChange={setClass9} index={0} />
                                                        <button onClick={() => handleSubmit(9, class9)} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                            Submit
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
                                                        <FontAwesomeIcon icon={faArrowCircleUp} className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 `} />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            name="class10"
                                                            value={class10}
                                                            onChange={(e) => setClass10(e.target.value)}
                                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Add link"
                                                            required
                                                        />
                                                        <SyllabusPdfUploader photos={class10} onChange={setClass10} index={0} />
                                                        <button onClick={() => handleSubmit(10, class10)} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                            Submit
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
                                                        <FontAwesomeIcon icon={faArrowCircleUp} className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 `} />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            name="class11"
                                                            value={class11}
                                                            onChange={(e) => setClass11(e.target.value)}
                                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Add link"
                                                            required
                                                        />
                                                        <SyllabusPdfUploader photos={class11} onChange={setClass11} index={0} />
                                                        <button onClick={() => handleSubmit(11, class11)} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                            Submit
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
                                                        <FontAwesomeIcon icon={faArrowCircleUp} className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 `} />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            name="class12"
                                                            value={class12}
                                                            onChange={(e) => setClass12(e.target.value)}
                                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Add link"
                                                            required
                                                        />
                                                        <SyllabusPdfUploader photos={class12} onChange={setClass12} index={0} />
                                                        <button onClick={() => handleSubmit(12, class12)} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                            Submit
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
                                                        <FontAwesomeIcon icon={faArrowCircleUp} className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 `} />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 py-4 text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            name="class13"
                                                            value={class13}
                                                            onChange={(e) => setClass13(e.target.value)}
                                                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                                            placeholder="Add link"
                                                            required
                                                        />
                                                        <SyllabusPdfUploader photos={class13} onChange={setClass13} index={0} />
                                                        <button onClick={() => handleSubmit("12th Pass", class13)} className="bg-[#182235] hover:bg-[#111a2b] text-white px-4 py-2 mt-2 rounded-lg font-semibold ">
                                                            Submit
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