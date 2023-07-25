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
    axios.get(`${BASE_URL}examresults/users/${id}`)
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

  // Helper function to format the response data as a list of key-value pairs
  const formatResponseData = (response) => {
  
    const options = Object.keys(response);

    options.sort((a,b) => a.localeCompare(b));
    return options.map((option) => (
      <li key={option}>
        <strong>{option}:</strong> {response[option]}
      </li>
    ));
  };

  return (
    <div className="items-center h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Examinees in the Exam</h1>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Username</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">View Response</th>
            </tr>
          </thead>
          <tbody>
            {examinees.map((examinee, index) => (
              <tr key={index}>
                <td className="border p-2">{examinee.username}</td>
                <td className="border p-2">{examinee.score}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
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
          <div className="modal shadow-md fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="modal-content pt-5 bg-gradient-to-r from-gray-300 to-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold m-2 px-5">{selectedExaminee.username}'s Response</h2>
              <ul className='pl-7 mt-7'>
                {formatResponseData(selectedExaminee.response)}
              </ul>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4"
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