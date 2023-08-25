import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from "../../../../config";

function UploadExcel() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      const response = await fetch(`${BASE_URL}OfflineResults/postResult`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Data saved:", data);
      } else {
        console.error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          <form onSubmit={handleSubmit} className="justify-center flex gap-0 md:gap-10">
              <div>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <button
                  className="px-4 py-2 mb-2 md:mb-0 md:mr-2 font-bold text-white bg-blue-700 rounded focus:outline-none focus:ring-2"
                  type="submit"
                >
                  Upload
                </button>
              </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default UploadExcel;
