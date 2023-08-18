import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from "../../../../config";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function About() {
  const [aboutIPEC, setAboutIPEC] = useState("");
  const [ipecAdvantages, setIpecAdvantages] = useState([]);
  const [ipecPedagogy, setIpecPedagogy] = useState([]);
  const [userData, setUserData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}aboutipec/get`, {
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      const data = response.data[0] || {};

      setUserData(data);
      setAboutIPEC(data.AboutIPEC || "");
      setIpecAdvantages(data.ipecAdvantages || []);
      setIpecPedagogy(data.ipecPedagogy || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeAdvantage = (index, e) => {
    const { name, value } = e.target;
    setIpecAdvantages((prevAdvantages) =>
      prevAdvantages.map((advantage, i) =>
        i === index ? { ...advantage, [name]: value } : advantage
      )
    );
  };

  const handleChangePedagogy = (index, e) => {
    const { name, value } = e.target;
    setIpecPedagogy((prevPedagogy) =>
      prevPedagogy.map((pedagogy, i) =>
        i === index ? { ...pedagogy, [name]: value } : pedagogy
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = {
      AboutIPEC: aboutIPEC,
      ipecAdvantages: ipecAdvantages,
      ipecPedagogy: ipecPedagogy,
    };

    axios
      .put(`${BASE_URL}AboutIpec/edit`, formData, {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      })
      .then((response) => {
        console.log("success");
        toast.success("Submitted successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Oops! Something went wrong");
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <main>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <div className="container p-6 mx-auto overflow-x-auto font-mono">
              {/* Form */}
              <h1 className="mb-4 text-2xl font-bold">About</h1>
              <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl border-[2px] border-black">
                <form onSubmit={handleSubmit}>
                  {/* Global Section */}
                  <div className="p-2 rounded-lg">
                    <h1 className="mb-4 text-xl font-bold">
                      About content section paragraph
                    </h1>
                    <textarea
                      type="text"
                      value={aboutIPEC}
                      onChange={(e) => setAboutIPEC(e.target.value)}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Enter About Desc"
                      required
                    />
                  </div>

                  {/* Advantages Section */}
                  <div className="p-2 rounded-lg">
                    <h1 className="mb-4 text-xl font-bold">
                      IPEC Advantaged Card Details
                    </h1>
                    <div className="flex flex-col gap-y-1">
                      {ipecAdvantages.map((advantage, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
                        >
                          <input
                            type="text"
                            name="title"
                            value={advantage.title}
                            onChange={(e) => handleChangeAdvantage(index, e)}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder={`Title${index + 1}`}
                            required
                          />
                          <input
                            type="text"
                            name="description"
                            value={advantage.description}
                            onChange={(e) => handleChangeAdvantage(index, e)}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder={`Desc${index + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pedagogy Section */}
                  <div className="p-2 mt-4 rounded-lg">
                    <h1 className="mb-4 text-xl font-bold">
                      IPEC Pedagogy Card Details
                    </h1>
                    <div className="flex flex-col gap-y-1">
                      {ipecPedagogy.map((pedagogy, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
                        >
                          <input
                            type="text"
                            name="title"
                            value={pedagogy.title}
                            onChange={(e) => handleChangePedagogy(index, e)}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder={`Title${index + 1}`}
                            required
                          />
                          <input
                            type="text"
                            name="description"
                            value={pedagogy.description}
                            onChange={(e) => handleChangePedagogy(index, e)}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder={`Desc${index + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-3/4">
                  <button
  type="submit"
  className="bg-[#4A90E2] hover:bg-[#3579CC] mx-6 text-white px-4 py-2 mt-8 rounded-lg  w-2/4 transition-colors duration-300 ease-in-out font-bold text-md"
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