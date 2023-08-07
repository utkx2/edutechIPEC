import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { saveAs } from 'file-saver';
import { BASE_URL } from '../../../../config'

const FacultyRegistrationDetails = () => {
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        // Fetch data from the API
        fetch(`${BASE_URL}facultyHire/get/${id}`)
            .then((response) => response.json())
            .then((data) => setFormData(data))
            .catch((error) => console.log(error));
        }, [id]);
    console.log(formData);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = (id) => {
        // Perform update logic here with the updated form data
        // You can send a request to the API to update the data
        // After updating, set isEditing to false to exit editing mode
        setIsEditing(false);
    };

    function updateDetails() {
        fetch(`${BASE_URL}registration/get/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Replace formData with the updated data object
        })
            .then((response) => response.json())
            .then((data) => {
                alert("form submitted");
                console.log(data);
                // Perform any necessary actions after successful update
                // For example, you can navigate to a different page or display a success message
            })
            .catch((error) => console.log(error));
    }

    const downloadAsExcel = () => {
        const ws = XLSX.utils.json_to_sheet(formData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "FormData");
        const blob = new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
            type: "application/octet-stream"
        });
        saveAs(blob, 'FormData.xlsx');
    };

    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    const downloadAsPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["User", "Email", "Phone", "Gender", "Category", "DOB", "Father Name", "Mother Name", "Father Number", "Mother Number", "Address Line 1", "Address Line 2", "Address Line 3", "City", "State", "Zipcode", "Message"];
        const tableRows = [];

        const formDataArray = Object.values(formData);
        tableRows.push(formDataArray);

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.save('FormData.pdf');
    };

    function formatDate(dateString) {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
        const year = dateObj.getFullYear();

        return `${day}-${month}-${year}`;
    }
    const [sidebarOpen, setSidebarOpen] = useState(false);
    if (!formData) {
        return (
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-x-auto overflow-y-auto">
                    <main>
                        {/* Site header */}
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                            <div className="flex justify-center">
                                <div className="p-6 bg-white rounded-lg shadow-2xl">
                                    <h2 className="mb-4 text-xl font-bold">
                                        Registration Details
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
    const stepNames = ["Tender Name", "Company Name" /* Add step names here */];

    const progress = Math.round(
        (formData.currentStep / (stepNames.length - 1)) * 100
    );
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-x-auto overflow-y-auto">
                <main>
                    {/* Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                        <div className="flex justify-center flex-shrink">
                            <div className="w-full p-8 bg-white shadow-2xl rounded-2xl md:p-20 lg:w-3/4">
                                {/* <ProgressBar
                                    percent={progress}
                                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                >
                                    {stepNames.map((_, index) => (
                                        <Step key={index}>
                                            {({ accomplished }) => (
                                                <div
                                                    className={`step ${accomplished ? "completed" : null
                                                        }`}
                                                />
                                            )}
                                        </Step>
                                    ))}
                                </ProgressBar> */}
                                <h2 className="mt-6 mb-4 text-3xl font-bold text-center">
                                    Faculty details
                                </h2>


                                <div className="grid grid-cols-2 gap-11 ">
                                    <div className="w-full">
                                        <label className="block mb-2 text-xl font-medium ">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md px-9 me-12"
                                            value={formData.firstName}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, company: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                            <label className="block mb-2 text-xl font-medium">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                                value={formData.lastName}
                                                readOnly={!isEditing}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, lastName: e.target.value })
                                                }
                                            />
                                        </div>

                                </div>
                                
                                <div className="grid grid-cols-2 mt-4 mb-4 gap-11">
                                   
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block mb-2 text-xl font-medium">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.email}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium mt-7 md:mt-0">
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.phoneNumber}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, experience: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-10 mb-6 md:grid-cols-2">
                                    {/*  */}
                                    <div className="relative z-0 flex flex-col h-10 gap-y-2 group">
                                        <label htmlFor="" className="text-sm text-gray-500 dark:text-gray-400">
                                            Choose Gender
                                        </label>
                                        <div className='flex items-start justify-start gap-x-4'>
                                            <div className="items-center pl-4 rounded basis-1/2 dark:border-gray-700">
                                                <input
                                                    id="bordered-radio-6"
                                                    type="radio"
                                                    value="male"
                                                    name="gender"
                                                    checked={formData.gender === "male"}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, email: e.target.value })
                                                    }
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 bg-green-300 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="bordered-radio-6"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Male
                                                </label>
                                            </div>

                                            <div className="items-center pl-4 rounded basis-1/2 dark:border-gray-700">
                                                <input
                                                    id="bordered-radio-7"
                                                    type="radio"
                                                    value="female"
                                                    name="gender"
                                                    checked={formData.gender === "female"}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, email: e.target.value })
                                                    }
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 bg-green-300 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="bordered-radio-6"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                                    <div>
                                        <label className="mt-2 mr-5" htmlFor="dob">
                                            DOB:
                                        </label>
                                        <div>
                                            <input
                                                type="text"
                                                id="dob"
                                                name="dob"
                                                value={formatDate(formData.dob)}
                                                readOnly={!isEditing}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, dob: e.target.value })
                                                }
                                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Date of Birth"
                                                style={{ color: "black", width: "100%" }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="category"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                            style={{ color: "black" }}
                                        >
                                            Select Category
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, experience: e.target.value })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option disabled>Choose Category</option>
                                            <option value="gen">General</option>
                                            <option value="ews">EWS</option>
                                            <option value="obc">OBC</option>
                                            <option value="sc">SC</option>
                                            <option value="st">ST</option>
                                            <option value="dis">Disability</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid gap-10 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium mt-7 md:mt-0">
                                            {" "}
                                            Qualification
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.qualification}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, qualification: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Previous Experience
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.previousExperience}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, previousExperience: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-10 mt-5 md:grid-cols-2 md:mt-0">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Address Line 1
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.addressLine1}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, addressLine1: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium mt-7 md:mt-0">
                                            {" "}
                                            Address Line 2
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.addressLine2}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, addressLine2: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-10 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Address Line 3
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.addressLine3}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, addressLine3: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            state
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.state}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, state: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-10 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.city}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, city: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.zipcode}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, zipcode: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-10 mt-5 md:grid-cols-2 md:mt-0">
                                    

                                </div>
                                <div>
                                        <label className="block mb-2 text-xl font-medium">
                                            Message
                                        </label>
                                        <textarea
                                            type="text"
                                            className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                                            value={formData.message}
                                            readOnly={!isEditing}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                        />
                                    <div>
                                    </div>
                                    {/* <label className="block mb-2 text-xl font-medium">Manpower Requirement:</label>
                    <input
                      type="text"
                      className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                      value={data.requirement.manpower}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">CIN Upload:</label>
                    <input
                      type="text"
                      className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                      value={data.companyUploads.cinUpload[0]}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">GST Upload:</label>
                    <input
                      type="text"
                      className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                      value={data.companyUploads.gstUpload[0]}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <div>
                    <label className="block mb-2 text-xl font-medium">PAN Upload:</label>
                    <input
                      type="text"
                      className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                      value={data.companyUploads.panUpload[0]}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xl font-medium">PAN:</label>
                    <input
                      type="text"
                      className="w-full p-2 py-4 text-lg bg-gray-200 border border-gray-300 rounded-md"
                      value={data.pan}
                      readOnly={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    />
                  </div>
                </div> */}
                                </div>
                                {/* <div className="flex justify-between mt-4">
                                    <div className="">
                                        {isEditing ? (
                                            <button
                                                className="bg-[#182235] text-white font-bold py-2 px-4 rounded mr-2"
                                                onClick={() => handleUpdate(formData._id)}
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-[#182235] text-white font-bold py-2 px-4 rounded mr-2"
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    <div className="">
                                        <button
                                            className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4
                                                ml-28 rounded focus:outline-none focus:ring-2"
                                            onClick={() => updateDetails(formData._id)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FacultyRegistrationDetails;