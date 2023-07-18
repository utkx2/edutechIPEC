import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function AdminTenderResultList() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const AddTenderResult = () => {
    navigate("/dashboard/tender/results/forms");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/apiTender/tenderdetails/alltenderResults"
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const showDetails = (userId) => {
    navigate(`/dashboard/user/${userId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = userData.filter((tender) => {
    const tenderIdMatch = tender.TenderId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const summaryMatch = tender.summary
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Check if any of the conditions is true
    return tenderIdMatch || summaryMatch;
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
      "Tender Id": user.TenderId,
      "User Id": user.userId,
      Summary: user.summary,
      Country: user.country,
      State: user.state,
      BRR: user.BRR,
      Authority: user.Authority,
      Deadline: user.deadline,
      "Tendor No": user.TendorNo,
      Description: user.description,
      "User Category": user.userCategory,
      "Tender Value": user.tenderValue,
      "Contract Value": user.contractValue,
    }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tender Results");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "tender-results.xlsx");
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();

    const headers = [
      "Tender Id",
      "User Id",
      "Summary",
      "Country",
      "State",
      "BRR",
      "Authority",
      "Deadline",
      "Tendor No",
      "Description",
      "User Category",
      "Tender Value",
      "Contract Value",
    ];

    const selectedData = currentUsers.map((user) => [
      user.TenderId,
      user.userId,
      user.summary,
      user.country,
      user.state,
      user.BRR,
      user.Authority,
      user.deadline,
      user.TendorNo,
      user.description,
      user.userCategory,
      user.tenderValue,
      user.contractValue,
    ]);

    const data = {
      headers,
      rows: selectedData,
    };

    const tableConfig = {};

    doc.autoTable(data.headers, data.rows, tableConfig);

    doc.save("tender-results.pdf");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}

            {/* Cards */}
            <div className="grid grid-cols-15 gap-6">
              {/* Table */}
              <section className="container mx-auto p-6 font-mono overflow-x-auto">
                <h1 className="text-xl font-bold mb-4">Tender Results</h1>
                <div className="flex flex-col md:flex-row mb-4 md:items-center md:justify-between">
                  {/* Search bar */}
                  <input
                    type="text"
                    className="w-64 px-4 py-2 mr-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded shadow focus:outline-none"
                    placeholder="Search by Tender"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />

                  <button
                    className="bg-[#182235] hover:bg-[#111a2b] text-white mt-4 md:mt-0 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={AddTenderResult}
                  >
                    Add New Tender Result
                  </button>
                </div>
                {/* Download buttons */}
                <div className="flex justify-end mb-4">
                  <button
                    className="bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 mr-2"
                    onClick={downloadAsExcel}
                  >
                    Download Excel
                  </button>
                  <button
                    className="bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={downloadAsPDF}
                  >
                    Download PDF
                  </button>
                </div>
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                          <th className="px-4 py-3">Tender Id</th>
                          <th className="px-4 py-3">User Id</th>
                          <th className="px-4 py-3">Summary</th>
                          <th className="px-4 py-3">Country</th>
                          <th className="px-4 py-3">State</th>
                          <th className="px-4 py-3">BRR</th>
                          <th className="px-4 py-3">Authority</th>
                          <th className="px-4 py-3">Deadline</th>
                          <th className="px-4 py-3">Tendor No</th>
                          <th className="px-4 py-3">Description</th>
                          <th className="px-4 py-3">User Category</th>
                          <th className="px-4 py-3">Tender Value</th>
                          <th className="px-4 py-3">Contract Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentUsers.map((tender) => (
                          <tr className="text-gray-700" key={tender._id}>
                            <td className="px-4 py-3 border">
                              <div className="flex items-center text-sm">
                                <div
                                  onClick={() => {
                                    showDetails(tender.userId);
                                  }}
                                  className="font-semibold text-black cursor-pointer"
                                >
                                  {tender.TenderId}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-ms font-semibold border">
                              {tender.userId}
                            </td>
                            <td className="px-4 py-3 text-xs border">
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                {tender.summary}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.country}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.state}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.BRR}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.Authority}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.deadline}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.TendorNo}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.description}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.userCategory}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.tenderValue}
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {tender.contractValue}
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
  );
}

export default AdminTenderResultList;
