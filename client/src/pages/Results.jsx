import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import "../styles/Course.css";

function Result() {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}results/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#d1e9f9]">
      <section className="p-2" id="result">
        {userData.length > 0 && (
          <>
            {userData.map((resultObj) => (
              <div key={resultObj._id}>
                <div className="container py-8 mx-auto">
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold">
                      {resultObj.exams[0].examName}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      <div className="modal">
        <div className="max-w-6xl mx-auto">
          {userData.map((resultObj) => (
            <img
              key={resultObj._id}
              src={resultObj.exams[0].image}
              alt={resultObj.exams[0].examName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Result;