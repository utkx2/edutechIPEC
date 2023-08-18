import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import "../styles/Course.css";

function Result() {
  const [userData, setUserData] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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

  function openModal(exam) {
    setSelectedExam(exam); 
    setModalOpen(true);

  }

  function closeModal() {
    setSelectedExam(null);
    setModalOpen(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Modal component that receives exam data as props
  function ExamModal({ exam }) {
    return (
      <div className="modal">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
          <img src={exam.image} alt={exam.examName} />
          {/* <h2>{exam.examName}</h2> */}
          </div>
          {isModalOpen && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 p-2 mr-4"
                onClick={() => closeModal()}
              >
                Close Result
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

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
                    <div className=" my-5">
                      <div className="text-center">
                        {!isModalOpen && (
                        <button
                          className="bg-red-500 p-2"
                          onClick={() => openModal(resultObj.exams[0])}
                        >
                          Open Result
                        </button>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      {/* This is where you render the modal */}
      {selectedExam && <ExamModal exam={selectedExam} />}
    </div>
  );
}

export default Result;