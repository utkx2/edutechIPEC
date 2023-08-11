import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

const ExamineesTable = () => {
  const { id } = useParams();
  const [examinees, setExaminees] = useState([]);
  const [selectedExaminee, setSelectedExaminee] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios.get(`${BASE_URL}examresults/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
    })
      .then(response => {
        setExaminees(response.data.userResults);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const openModal = (examinee) => {
    setSelectedExaminee(examinee);
  };

  const closeModal = () => {
    setSelectedExaminee(null);
  };

  const checkOptionValue = (value) => {
    switch (value) {
      case '0':
        return 'a';
      case '1':
        return 'b';
      case '2':
        return 'c';
      case '3':
        return 'd';
      default:
        return value;
    }
  }

  // Helper function to format the response data as a list of key-value pairs
  const formatResponseData = (response) => {

    const options = Object.keys(response);
    console.log(response)

    // options.sort((a,b) => a.localeCompare(b));
    return options.map((option) => (
      <li key={option}>
        <strong>{option}:</strong> {checkOptionValue(response[option])}
      </li>
    ));
  };

  return (
    <div className="items-center h-screen">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Examinees in the Exam</h1>
        <table className="w-full border border-collapse">
          <thead>
            <tr>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">View Response</th>
            </tr>
          </thead>
          <tbody>
            {examinees.map((examinee, index) => (
              <tr key={index}>
                <td className="p-2 border">{examinee.username}</td>
                <td className="p-2 border">{examinee.score}</td>
                <td className="p-2 border">
                  <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
                    onClick={() => openModal(examinee)}
                  >
                    View Response
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedExaminee && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full shadow-md modal">
            <div className="p-4 pt-5 bg-white border-r border-black border-solid rounded-lg shadow-lg modal-content border-spacing-2 border-x-2 border-y-2">
              <h2 className="px-5 m-2 text-xl font-bold">{selectedExaminee.username}'s Response</h2>
              <ul className='pl-5 mb-6 ml-20 text-xl mt-7'>
                {formatResponseData(selectedExaminee.response)}
              </ul>
              <button
                className="px-4 py-2 mt-4 ml-20 font-bold text-white bg-red-600 rounded cursor-pointer"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamineesTable;