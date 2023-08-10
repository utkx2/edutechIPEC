import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BASE_URL } from '../../../../config'
import { Link } from "react-router-dom";

import { Dialog } from '@headlessui/react'

function CoursesList() {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [userType, setUserType] = useState("all");
    const [subscriptionStatus, setSubscriptionStatus] = useState("all");
    const navigate = useNavigate();

    const handleDelete = async (userId) => {
        setIsOpen(false)
        try {
            const response = await axios.delete(`${BASE_URL}Courses/remove/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        auth: localStorage.getItem("token"),
                    },
                })
            console.log(response)
            if (response.status == 200) {
                console.log('successfully deleted')
                fetchData()
            }
            if (response.status == 500) {
                console.log('delete failed')
            }
            return;
        } catch (error) {
            console.log(error)
            return;
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}Courses/get/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        auth: localStorage.getItem("token"),
                    },
                }
            );
            console.log(response.data)
            setUserData(response.data);
            console.log(userData);
            //  setUserData(response.data.users);
            console.log(userData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    useEffect(() => {
        // Now you can safely access the updated userData state here
        console.log(userData);
    }, [userData]);


    // const showDetails = (userId) => {
    //     navigate(`/dashboard/user/${userId}`);
    // };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSubscriptionStatusChange = (e) => {
        setSubscriptionStatus(e.target.value);
    };

    //     const nameMatch = user.name
    //         .toLowerCase()
    //             .includes(searchTerm.toLowerCase());
    //     const emailMatch = user.email
    //         .toLowerCase()
    //         .includes(searchTerm.toLowerCase());


    //     // Check if any of the conditions is true
    //     return (
    //         (nameMatch || emailMatch)
    //     );
    // });

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData?.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        const totalPages = Math.ceil(userData.length / usersPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const downloadAsExcel = () => {
        const selectedData = currentUsers?.map((user) => ({
            User: user.name,
            Role: user.userRole ? user.userRole : 'student',
            Email: user.email,
            Phone: user.phoneNumber,
        }));

        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const data = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(data, "users.xlsx");
    };

    const downloadAsPDF = () => {
        const doc = new jsPDF();

        const headers = ["User", "Role", "Email", "Phone"];

        const selectedData = currentUsers?.map((user) => [
            user.name,
            user.userRole ? user.userRole : 'student',
            user.email,
            user.phoneNumber
        ]);

        const data = {
            headers,
            rows: selectedData
        };

        const tableConfig = {
            startY: 20,
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            bodyStyles: { fillColor: 255, textColor: 0 },
            alternateRowStyles: { fillColor: 245 },
            margin: { top: 20 }
        };

        doc.autoTable(data.headers, data.rows, tableConfig);

        doc.save("users.pdf");
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [deleteId, setDeleteId] = useState()
    console.log(userData);
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                <main>
                    {/* Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                        {/* Dashboard actions */}
                        {/* Cards */}
                        <div className="grid gap-6 grid-cols-15">
                            {/* Table (Top Channels) */}
                            <section className="container p-6 mx-auto overflow-x-auto font-mono">
                                <h1 className="mb-4 text-xl font-bold">Courses</h1>
                                <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
                                    {/* Search bar */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-start gap-2">
                                        <input
                                            type="text"
                                            className="px-4 py-2 mb-2 mr-0 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded shadow w-[300px] md:mb-0 md:mr-2 focus:outline-none"
                                            placeholder="Search by name or email"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        {/* User type select bar */}
                                        <Link to={'/dashboard/courses'}
                                            className="px-4 py-2 mb-2 text-white bg-blue-600 border border-gray-300 rounded shadow w-fit md:mb-0 md:ml-2 focus:outline-none"
                                            value={userType}
                                            onChange={handleUserTypeChange}
                                        >
                                            ADD Course
                                        </Link>
                                    </div>
                                    {/* download buttons */}
                                    <div>
                                        <button
                                            className="px-4 py-2 mr-4 mb-2 font-bold text-white bg-green-700 rounded focus:outline-none focus:ring-2 md:mb-0 md:mr-2"
                                            onClick={downloadAsExcel}
                                        >
                                            Download Excel
                                        </button>
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-red-700 rounded focus:outline-none focus:ring-2"
                                            onClick={downloadAsPDF}
                                        >
                                            Download PDF
                                        </button>
                                    </div>
                                </div>
                                {/* Download buttons */}
                                {/* <div className="flex flex-col justify-end mb-4 md:flex-row">
                  <button
                    className="px-4 py-2 mb-2 font-bold text-white bg-green-700 rounded focus:outline-none focus:ring-2 md:mb-0 md:mr-2"
                    onClick={downloadAsExcel}
                  >
                    Download Excel
                  </button>
                  <button
                    className="px-4 py-2 font-bold text-white bg-red-700 rounded focus:outline-none focus:ring-2"
                    onClick={downloadAsPDF}
                  >
                    Download PDF
                  </button>
                </div> */}
                                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                    <div className="w-full overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="font-semibold tracking-wide text-left text-gray-900 uppercase bg-gray-100 border-b border-gray-600 text-md">
                                                    <th className="px-4 py-3">Title</th>
                                                    <th className="px-4 py-3">Course Code</th>
                                                    <th className="px-4 py-3">Admission Mode</th>
                                                    <th className="px-4 py-3">Phases</th>
                                                    <th className="px-4 py-3">Price</th>
                                                    <th className="px-4 py-3">Discount</th>
                                                    <th className="py-3 text-center"><FontAwesomeIcon icon={faTrash} style={{ color: "#000", }} /></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {currentUsers?.map((user) => (
                                                    <tr className="text-gray-700" key={user._id}>
                                                        <td className="px-4 py-3 border">
                                                            <div className="flex items-center text-sm">
                                                                {/* <div
                                                                    onClick={() => {
                                                                        showDetails(user._id);
                                                                    }}
                                                                > */}
                                                                <p className="font-semibold text-black">
                                                                    {user.Title}
                                                                </p>
                                                                {/* </div> */}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 font-semibold border text-ms">
                                                            {user.CourseCode}
                                                        </td>
                                                        <td className="px-4 py-3 font-semibold border text-ms">
                                                            {user.AdmissionMode}
                                                        </td>
                                                        <td className="px-4 py-3 text-xs border">
                                                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                                                {user.Phases}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 font-semibold border text-ms">
                                                            {user.price}
                                                        </td>
                                                        <td className="px-4 py-3 font-semibold border text-ms">
                                                            {user.discount}
                                                        </td>
                                                        <td onClick={() => {
                                                            setIsOpen(true)
                                                            setDeleteId(user._id)
                                                        }} className="py-3 text-center border cursor-pointer">
                                                            <FontAwesomeIcon icon={faTrash} style={{ color: "#e01b24", }} />
                                                        </td>
                                                        {/* <td className="px-4 py-3 text-sm border">
                              {user.country}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {user.city}
                            </td>
                            <td className="px-4 py-3 text-xs border">
                              <span
                                className={`px-2 py-1 font-semibold leading-tight ${
                                  !user.subscription ||
                                  user.subscription.status === "inactive"
                                    ? "text-red-700 bg-red-100"
                                    : "text-green-700 bg-green-100"
                                } rounded-sm`}
                              >
                                {user.subscription &&
                                user.subscription.status !== "inactive"
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-between px-4 py-3 bg-gray-100 border-t border-gray-200 sm:px-6">
                                        <div className="flex items-center">
                                            <button
                                                className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
                                                onClick={previousPage}
                                                disabled={currentPage === 1}
                                            >
                                                <FontAwesomeIcon icon={faArrowLeft} />
                                            </button>
                                            <span className="px-2 text-sm">{currentPage}</span>
                                            <button
                                                className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
                                                onClick={nextPage}
                                                disabled={
                                                    currentPage ===
                                                    Math.ceil(userData?.length / usersPerPage)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faArrowRight} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
            {/* <div className="flex flex-col items-center justify-center w-full h-full"> */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="max-w-md px-12 py-10 mx-auto bg-white rounded">
                        <Dialog.Title>Are you sure you want to delete the user?</Dialog.Title>
                        <div className="flex items-center justify-end gap-4 mt-5">
                            <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 text-white bg-red-700 rounded-[8px] cursor-pointer">Delete</button>
                            <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-white bg-gray-700 rounded-[8px] cursor-pointer">Cancel</button>
                        </div>

                        {/* ... */}
                    </Dialog.Panel>
                </div>
            </Dialog>
            {/* </div> */}
        </div>
    );
}

export default CoursesList;