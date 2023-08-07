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
import moment from "moment";

export default function Contact() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}Contact/allUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      console.log(response)
      if (response.status == 200) {
        console.log('successfully get all registrations')
      }
      if (response.status == 500) {
        console.log('failed get all registrations')
      }
      setUserData(response.data);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('useEffect')
    fetchData();
  }, []);

  const showDetails = (userId) => {
    navigate(`/dashboard/user/${userId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  console.log('coponent rendered again')

  const filteredData = userData.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // const userTypeMatch =
    //   userType === "all" ||
    //   (userType === "admin" && user.userRole === "admin") ||
    //   (userType === "hr" && user.userRole === "hr") ||
    //   (userType === "user" && user.userRole === "user") ||
    //   (userType === "employee" && user.userRole === "employee");
    // const subscriptionStatusMatch =
    //   subscriptionStatus === "all" ||
    //   (subscriptionStatus === "active" &&
    //     user.subscription &&
    //     user.subscription.status === "active") ||
    //   (subscriptionStatus === "inactive" &&
    //     (!user.subscription || user.subscription.status === "inactive"));

    // Check if any of the conditions is true
    return (
      (nameMatch || emailMatch)
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
    const selectedData = currentUsers.map((user) => ({
      User: user.name,
      Email: user.email,
      Phone: user.mobile,
      Date: moment(user.category).format('DD-MM-YYYY'),
      Message: user.message
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

    const headers = ["User", "Email", "Phone", 'Date', "Message"];

    const selectedData = currentUsers.map((user) => [
      user.name,
      user.email,
      user.mobile,
      moment(user.category).format('DD-MM-YYYY'),
      user.message
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
                <h1 className="mb-4 text-xl font-bold">All Contacts Made</h1>
                <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
                  {/* Search bar */}
                  <div className="flex items-center justify-start flex-1 gap-2">
                    <input
                      type="text"
                      className="px-4 py-2 mb-2 mr-0 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded shadow w-[300px] md:mb-0 md:mr-2 focus:outline-none"
                      placeholder="Search by name or email"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    {/* User type select bar */}
                    {/* check which type */}
                    {/* <select
                    className="px-4 py-2 mb-2 text-gray-700 bg-white border border-gray-300 rounded shadow w-fit md:mb-0 md:ml-2 focus:outline-none"
                    value={userType}
                    onChange={handleUserTypeChange}
                  >
                    <option value="all">All Users</option>
                    <option value="admin">Admin</option>
                    <option value="student ">Student</option>
                  </select> */}
                  </div>
                  {/* download buttons */}
                  <div>
                    <button
                      className="px-4 py-2 mb-2 font-bold text-white bg-green-700 rounded focus:outline-none focus:ring-2 md:mb-0 mr-4 md:mr-2"
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
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="font-semibold tracking-wide text-left text-gray-900 uppercase bg-gray-100 border-b border-gray-600 text-md">
                          <th className="px-4 py-3">User</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Phone</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Message</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentUsers.map((user) => (
                          <tr className="text-gray-700" key={user._id}>
                            <td className="px-4 py-3 border">
                              <div className="flex items-center text-sm">
                                {/* <div
                                  onClick={() => {
                                    showDetails(user._id);
                                  }}
                                > */}
                                  <p className="font-semibold text-black whitespace-nowrap">
                                    {user.name}
                                  </p>
                                {/* </div> */}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-semibold border text-ms">
                              {user.email}
                            </td>
                            <td className="px-4 py-3 text-xs border">
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                {user.mobile}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold border text-ms">
                              {moment(user.category).format('DD-MM-YYYY')}
                            </td>
                            <td className="px-4 py-3 font-semibold truncate border text-ms">
                              {user.message}
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
    </div>
  )
}
