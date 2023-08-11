import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Testimonials() {
  const [userData, setUserData] = useState({});
  // api/whyIPEC/get
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}testimonials/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      // console.log(response.data);
      setUserData(response.data);
      // setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const color = [
    "bg-orange-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-blue-100",
  ];

  return (
    <div className="flex flex-col items-center justify-center my-12">
      <h1 className="text-4xl font-bold text-center text-black-500">
        Testimonials
      </h1>

      {userData.introVideoUrl && (
        <div className="grid max-w-3xl grid-cols-1 mx-2 sm:mx-8 md:mx-20 mt-8 gap-y-8 md:gap-x- gap-x-20 md:grid-cols-2">

          <iframe
            className="w-full md:col-span-2"
            width="560"
            height="315" // Adjust the height to your preference
            src={userData.introVideoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

          {userData.cards.map((card, index) => (
            <div
              key={card._id}
              className={`${color[index]} flex flex-col justify-between w-full sm:w-[400px] gap-4 px-4 sm:px-8 py-4 border rounded-lg shadow-xl border-slate-600 sm:h-[282px]`}
            >
              <div>
                <div className="flex justify-center -mt-8 md:justify-end">
                  <img
                    className="object-cover w-16 h-16 border-2 border-indigo-500 rounded-full"
                    src={card.imageUrl}
                  />
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    {card.title}
                  </h2>

                  <p className="mt-2 text-gray-600">{card.content}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href="#"
                  className="py-2 md:py-4 text-xl font-medium text-black"
                >
                  {card.examName}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
