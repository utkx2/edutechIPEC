import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const WhyIPEC = () => {
  const [userData, setUserData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}whyIPEC/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      setUserData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reasonsArr = [
    'https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%201.png',
    "https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%203.png",
    "https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%204.png",
    "https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%202.png",
    "https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%205.png",
    "https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%206.png"
  ];

  return (
    <>
      {userData.Title && (
        <div className="bg-[#d1e9f9]">
          <div className="max-w-6xl px-4 py-10 mx-auto ">
            <div className="">
              <div className="flex justify-center ">
                <h2 className="text-3xl font-bold mb-4 text-indigo-900 border-b-[6px] border-yellow-400">
                  {userData.Title}
                </h2>
              </div>
              <p className="text-[16px] leading-relaxed text-center ">
                {userData.Content}
              </p>
            </div>

            <div className="grid grid-cols-1 p-4 mt-10 md:grid-cols-2 md:mx-20 gap-9">
              {userData?.Reasons.map((userDataObj, index) => (
                <div key={index} className="flex flex-col items-center mx-4 md:flex-row md:items-start md:mx-8">
                  <img
                    src={reasonsArr[index]}
                    alt="reasons"
                    className="w-24 h-24 mb-4 mr-0 md:w-15 md:h-15 md:mr-6 md:mb-0"
                  />
                  <p className="text-center md:text-left">{userDataObj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhyIPEC;
