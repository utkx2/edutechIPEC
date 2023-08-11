import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from "../../../../config";
import axios from "axios";
import TestimonialPhotoUploader from "./TestimonialPhotoUploader";

export default function Testimonials() {
  const [videoLink, setVideoLink] = useState("");
  const [userData, setUserData] = useState({});
  const [cards, setCards] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [imageUrl1, setImageUrl1] = useState("");
  const [photos, setPhotos] = useState([]);


  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, [name]: value } : card
      )
    );
  };

  const handleItemClick = (index) => {
    // Store the clicked index in the state variable
    // setPhotos();
    // setPhotoNumber(index);
    // console.log(carousel.Carousels[index].fileLink);
    // carousel.Carousels[index].fileLink = photos[index];
    // console.log(carousel.Carousels[index].fileLink);
    // console.log(cards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      introVideoUrl: videoLink,
      cards: cards,
    };

    const token = localStorage.getItem("token");

    axios
      .put(`${BASE_URL}testimonials/edit`, formData, {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}testimonials/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      setUserData(response.data);
      if (response.data.cards) {
        setCards(response.data.cards);
      }
      setVideoLink(response.data.introVideoUrl || "");
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
              <h1 className="mb-4 text-2xl font-bold">Testimonials</h1>
              <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl  border-[2px] border-black">
                <form onSubmit={handleSubmit}>
                  <div className="p-2 rounded-lg">
                    <h1 className="mb-4 text-xl font-bold">Video Link</h1>
                    <textarea
                      type="text"
                      name="video"
                      onChange={(e) => setVideoLink(e.target.value)}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                      placeholder="Video Link"
                      value={videoLink}
                      required
                    />
                  </div>

                  <div className="p-2 rounded-lg">
                    {cards.map((card, index) => (
                      <div key={index}>
                        <h1 className="mb-4 text-xl font-bold">
                          {`IPEC Testimonials ${index + 1}`}
                        </h1>
                        <div className="flex flex-col gap-y-1">
                          <input
                            type="text"
                            name="title"
                            value={card.title}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="Title"
                            required
                          />
                          <input
                            type="text"
                            name="content"
                            value={card.content}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="content"
                            required
                          />

                          <input
                            type="text"
                            name="imageUrl"
                            value={card.imageUrl}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            placeholder="ImageUrl"
                            required
                          />

                          <div onClick={() => handleItemClick(index)}>
                            <TestimonialPhotoUploader photos={cards} onChange={setCards} index={index} />
                          </div >

                          <input
                            type="text"
                            name="examName"
                            value={card.examName}
                            onChange={(e) => handleChange(index, e)}
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