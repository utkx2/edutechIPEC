import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

function Testimonials() {
  const [userData, setUserData] = useState({});

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
      <h1 className="text-4xl font-bold text-center text-black">
        Testimonials
      </h1>

      {userData.introVideoUrl && (
        <>
          <iframe
            className="w-full col-span-2"
            width="560"
            height="450"
            src={userData.introVideoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          <div className="grid max-w-3xl grid-cols-1 mx-20 mt-20 gap-y-16 gap-x-20 sm:grid-cols-2 grid-row">
            {userData.cards.map((card, index) => (
              <div
                key={card._id}
                className={`${color[index]} flex flex-col justify-between w-[400px] gap-4 px-8 py-4 border rounded-lg shadow-xl border-slate-600 h-[282px]`}
              >
                <div>
                  <div className="flex justify-center -mt-16 md:justify-end">
                    <img
                      className="object-cover w-20 h-20 border-2 border-indigo-500 rounded-full"
                      src={card.imageUrl}
                      alt={card.title}
                    />
                  </div>

                  <div>
                    <h2 className="text-3xl font-semibold text-gray-800">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-gray-600">{card.content}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <a
                    href="#"
                    className="py-4 text-xl font-medium text-black"
                  >
                    {card.examName}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Testimonials;