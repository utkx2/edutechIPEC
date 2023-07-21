import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const WhyIPEC = () => {
  const [userData, setUserData] = useState({})
  // api/whyIPEC/get
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/whyIPEC/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      setUserData(response.data[0])
      // setUserData(response.data);
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
  ]
  return (
    <>

    {userData.Title && (
      <div className="bg-[#d1e9f9]">
      <div className="max-w-6xl px-4 py-5 mx-auto">
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
      
        <div className="grid grid-cols-2 p-4 mx-20 mt-10 gap-9">
          {userData?.Reasons.map((userDataObj, index) => ( 
            <div key={index} className="flex flex-row items-center mx-8">
              <img
                src={reasonsArr[index]}
                alt="reasons"
                className="mr-10 w-15 h-15"
              />
              <p className="mt-2 text-center">{userDataObj}</p>
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
