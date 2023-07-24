import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from "../../../../config";
import axios from "axios";

export default function Testimonials() {
  const [videoLink, setVideoLink] = useState();
  const [userData, setUserData] = useState({});

  const [testimonials1, setTestimonials1] = useState({
    title: "",
    content: "",
    imageUrl: "",
    examName: "",
  });
  const [testimonials2, setTestimonials2] = useState({
    title: "",
    content: "",
    imageUrl: "",
    examName: "",
  });
  const [testimonials3, setTestimonials3] = useState({
    title: "",
    content: "",
    imageUrl: "",
    examName: "",
  });
  const [testimonials4, setTestimonials4] = useState({
    title: "",
    content: "",
    imageUrl: "",
    examName: "",
  });

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setTestimonials1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setTestimonials2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setTestimonials3((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange4 = (e) => {
    const { name, value } = e.target;
    setTestimonials4((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardsArr = [
      {
        title: testimonials1.title,
        content: testimonials1.content,
        imageUrl: testimonials1.imageUrl,
        examName: testimonials1.examName,
      },
      {
        title: testimonials2.title,
        content: testimonials2.content,
        imageUrl: testimonials2.imageUrl,
        examName: testimonials2.examName,
      },
      {
        title: testimonials3.title,
        content: testimonials3.content,
        imageUrl: testimonials3.imageUrl,
        examName: testimonials3.examName,
      },
      {
        title: testimonials4.title,
        content: testimonials4.content,
        imageUrl: testimonials4.imageUrl,
        examName: testimonials4.examName,
      },
    ];

    const formData = {
      introVideoUrl: videoLink,
      cards: cardsArr,
    };

    const token = localStorage.getItem("token");

    const requestBody = JSON.stringify(formData);

    fetch(`${BASE_URL}testimonials/edit`, {
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
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
      });
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // {
  //     "AboutIPEC": "IPEC is a leading educational institution...",
  //         "ipecAdvantages": [
  // {
  //     "title": "",
  //     "description": ""
  // },
  //             {
  //                 "title": "State-of-the-Art Infrastructure",
  //                 "description": "We provide modern classrooms and labs..."
  //             }
  //         ],
  //             "ipecPedagogy": [
  //                 {
  //                     "title": "Interactive Learning",
  //                     "description": "We emphasize interactive learning methodologies..."
  //                 },
  //                 {
  //                     "title": "Project-Based Learning",
  //                     "description": "Students work on real-world projects..."
  //                 }
  //             ]
  // }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}testimonials/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setUserData(response.data);
      // setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Sidebar */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <main>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <div className="container p-6 mx-auto overflow-x-auto font-mono">
              {/*---------> Table (Top Channels) */}

              <h1 className="mb-4 text-2xl font-bold">Testimonials</h1>
              <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl  border-[2px] border-black">
                <form onSubmit={handleSubmit}>
                  {/* Global Section */}
                  <div className="p-2 rounded-lg">
                    <h1 className="mb-4 text-xl font-bold">Video Link</h1>
                    <textarea
                      type="text"
                      name="video"
                      onChange={(e) => setVideoLink(e.target.value)}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Video Link"
                      value={userData.introVideoUrl}
                      required
                    />
                  </div>

                  <div className="p-2 rounded-lg">
                  {userData.cards &&
                      userData.cards.map((reason, index) => (
                        <div
                          key={index}
                          // className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
                        >
                    <h1 className="mb-4 text-xl font-bold">
                    {`IPEC Testimonials ${index + 1}`}
                    </h1>
                          <div className="flex flex-col gap-y-1">
                            <input
                              type="text"
                              name="title"
                              value={reason.title}
                              onChange={handleChange1}
                              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              placeholder="Title"
                              required
                            />
                            <input
                              type="text"
                              name="content"
                              value={reason.content}
                              onChange={handleChange1}
                              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              placeholder="content"
                              required
                            />

                            <input
                              type="text"
                              name="imageUrl"
                              value={reason.imageUrl}
                              onChange={handleChange1}
                              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              placeholder="ImageUrl"
                              required
                            />
                            <input
                              type="text"
                              name="examName"
                              value={reason.examName}
                              onChange={handleChange1}
                              className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              placeholder="Exam name"
                              required
                            />
                          </div>
                        </div>
                      ))}
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
