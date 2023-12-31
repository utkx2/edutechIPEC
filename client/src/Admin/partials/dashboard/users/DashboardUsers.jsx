import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faTrash,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BASE_URL } from "../../../../config";

import { Dialog } from "@headlessui/react";

function DashboardUsers() {
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState("all");
  const [subscriptionStatus, setSubscriptionStatus] = useState("all");
  const navigate = useNavigate();
  const [userRoleFilter, setUserRoleFilter] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleDelete = async (userId) => {
    setIsOpen(false);
    try {
      const response = await axios.delete(`${BASE_URL}user/byid/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      // console.log(response)
      if (response.status == 200) {
        // console.log('successfully deleted')
        fetchData();
      }
      if (response.status == 500) {
        console.log("delete failed");
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}user/getall?userRole=${
          userRoleFilter ? "admin" : "student"
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );

      const usersWithSerialNumbers = response.data.users.map((user, index) => ({
        ...user,
        serialNumber: index + 1,
      }));

      setUserData(usersWithSerialNumbers);
      setSerialNumbers(usersWithSerialNumbers.map((user) => user.serialNumber));
    } catch (error) {
      console.error(error);
    }
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    processExcelFile(uploadedFile);
  };

  const processExcelFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("excelFile", file);

      const response = await axios.post(
        `${BASE_URL}user/excelupload/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Bulk upload successful");
        // Perform any additional actions after successful upload
      } else {
        console.log("Bulk upload failed");
      }
    } catch (error) {
      console.error("Error processing Excel file:", error);
    }
  };

  const uploadDataToAPI = async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}user/excelupload/signup`,
        data,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        console.log("Bulk upload successful");
      } else {
        console.log("Bulk upload failed");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const showDetails = (userId) => {
  //   navigate(`/dashboard/user/${userId}`);
  // };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = userData.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const userTypeMatch =
      userType === "all" ||
      (userType === "admin" && user.userRole === "admin") ||
      (userType === "hr" && user.userRole === "hr") ||
      (userType === "user" && user.userRole === "user") ||
      (userType === "employee" && user.userRole === "employee");
    const userRoleMatch =
      !userRoleFilter || (userRoleFilter && user.userRole === "admin");
    const subscriptionStatusMatch =
      subscriptionStatus === "all" ||
      (subscriptionStatus === "active" &&
        user.subscription &&
        user.subscription.status === "active") ||
      (subscriptionStatus === "inactive" &&
        (!user.subscription || user.subscription.status === "inactive"));

    // Check if any of the conditions is true
    return (
      (nameMatch || emailMatch) &&
      userTypeMatch &&
      userRoleMatch &&
      subscriptionStatusMatch
    );
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(filteredData.length / usersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const downloadAsExcel = () => {
    const selectedData = currentUsers.map((user, index) => ({
      SerialNumber: serialNumbers[index],
      User: user.name,
      Role: user.userRole ? user.userRole : "student",
      Email: user.email,
      Phone: user.mobileNumber,
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

    const headers = ["Serial No.", "User", "Role", "Email", "Phone"];

    const selectedData = currentUsers.map((user, index) => [
      serialNumbers[index],
      user.name,
      user.userRole ? user.userRole : "student",
      user.email,
      user.mobileNumber,
    ]);

    const data = {
      headers,
      rows: selectedData,
    };

    const tableConfig = {
      startY: 20,
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      bodyStyles: { fillColor: 255, textColor: 0 },
      alternateRowStyles: { fillColor: 245 },
      margin: { top: 20 },
    };

    doc.autoTable(data.headers, data.rows, tableConfig);

    doc.save("users.pdf");
  };

  const AddStudent = () => {
    window.location.href = "/signup";
  };

  const handleUserRole = async (userId, currentUserRole) => {
    console.log("Attempting to update user role...");

    const newRole = currentUserRole === "admin" ? "student" : "admin";

    try {
      const response = await axios.put(`${BASE_URL}user/makeAdmin/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      // console.log("Response:", response);

      if (response.data === "role updated successfully") {
        //   console.log("Role updated successfully");
        fetchData(); // Fetch updated data after role change
      } else {
        console.log("Role update failed");
      }
    } catch (error) {
      console.error("Error:", error);
      // if(error.response){
      //   console.log("response data:", error.response.data);
      //   console.log("Response status:", error.response.status);
      // }
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

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
                <h1 className="mb-4 text-xl font-bold">All User</h1>
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
                  </div>
                  {/* download buttons */}
                  <div className="flex flex-col md:flex-row gap-2 mb-2">
                    <button
                      className="px-4 py-2 mb-2 md:mb-0 md:mr-2 font-bold text-white bg-green-700 rounded focus:outline-none focus:ring-2"
                      onClick={downloadAsExcel}
                    >
                      Download Excel
                    </button>
                    <button
                      className="px-4 py-2 mb-2 md:mb-0 md:mr-2 font-bold text-white bg-red-700 rounded focus:outline-none focus:ring-2"
                      onClick={downloadAsPDF}
                    >
                      Download PDF
                    </button>
                    <button
                      className="px-4 py-2 mb-2 md:mb-0 md:mr-2 font-bold text-white bg-yellow-700 rounded focus:outline-none focus:ring-2"
                      onClick={AddStudent}
                    >
                      Add Student
                    </button>
                    <button
                      className="px-4 py-2 mb-2 md:mb-0 md:mr-2 font-bold text-white bg-blue-700 rounded focus:outline-none focus:ring-2"
                      onClick={openFileInput}
                    >
                      Bulk Uploading
                    </button>
                  </div>
                </div>
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="font-semibold tracking-wide text-left text-gray-900 uppercase bg-gray-100 border-b border-gray-600 text-md">
                          <th className="px-4 py-3">Serial Number</th>
                          <th className="px-4 py-3">User</th>
                          <th className="px-4 py-3">Role</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Phone</th>
                          <th className="py-3 text-center">
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "#000" }}
                            />
                          </th>
                          <th className="px-4 py-3">User Role</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentUsers.map((user, index) => (
                          <tr className="text-gray-700" key={user._id}>
                            <td className="px-4 py-3 border">
                              {serialNumbers[index]}
                            </td>
                            <td className="px-4 py-3 border">
                              <div className="flex items-center text-sm">
                                <div
                                  onClick={() => {
                                    showDetails(user._id);
                                  }}
                                >
                                  <p className="font-semibold text-black">
                                    {user.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 font-semibold border text-ms">
                              {user.userRole === "admin" ? "admin" : "student"}
                            </td>
                            <td className="px-4 py-3 font-semibold border text-ms">
                              {user.email}
                            </td>
                            <td className="px-4 py-3 text-xs border">
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                {user.mobileNumber}
                              </span>
                            </td>
                            <td
                              onClick={() => {
                                setIsOpen(true);
                                setDeleteId(user._id);
                              }}
                              className="py-3 px-1 text-center border cursor-pointer"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: "#e01b24" }}
                              />
                            </td>
                            <td
                              className="text-green-600 font-bold py-3 px-1 text-center border cursor-pointer"
                              onClick={() =>
                                handleUserRole(user._id, user.userRole)
                              }
                            >
                              <FontAwesomeIcon icon={faPowerOff} />
                            </td>
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
                          Math.ceil(filteredData.length / usersPerPage)
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
      <div>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
          ref={fileInputRef}
        />
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
            <Dialog.Title>Are you sure you want to delete the use</Dialog.Title>
            <div className="flex items-center justify-end gap-4 mt-5">
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 text-white bg-red-700 rounded-[8px] cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-white bg-gray-700 rounded-[8px] cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* ... */}
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  );
}

export default DashboardUsers;
