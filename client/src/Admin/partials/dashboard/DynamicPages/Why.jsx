import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from "../../../../config";
import axios from "axios";

export default function WHY() {
  const [whyIPEC, setWhyIPEC] = useState("");
  const [whyIPECContent, setWhyIPECContent] = useState("");
  const [userData, setUserData] = useState({});
  const [whyIPECReasons, setWhyIPECReasons] = useState({
    reason1: "",
    reason2: "",
    reason3: "",
    reason4: "",
    reason5: "",
    reason6: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWhyIPECReasons((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = {
      Title: whyIPEC,
      Content: whyIPECContent,
      Reasons: Object.values(whyIPECReasons),
    };



    const requestBody = JSON.stringify(formData);

    fetch(`${BASE_URL}whyIPEC/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
        // You can show a success message or handle the response as needed
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}whyIPEC/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      setUserData(response.data[0]);
      setWhyIPEC(response.data[0].Title || "");
      setWhyIPECContent(response.data[0].Content || "");
      setWhyIPECReasons(response.data[0].Reasons || {
        reason1: "",
        reason2: "",
        reason3: "",
        reason4: "",
        reason5: "",
        reason6: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                      name="whyIPEC"
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
                      name="whyIPECContent"
                      value={whyIPECContent}
                      onChange={(e) => setWhyIPECContent(e.target.value)}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter About Desc"
                      required
                    />
                  </div>

                  <div className="p-2 rounded-lg">
                    <h1 className="mb-4 text-xl font-bold">
                      IPEC Advantaged Card Details
                    </h1>
                    <div className="flex flex-col gap-y-1">
                      {Object.keys(whyIPECReasons).map((reason, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
                        >
                          <input
                            type="text"
                            name={reason}
                            value={whyIPECReasons[reason]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder={reason}
                            required
                          />
                        </div>
                      ))}
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
  );
}
