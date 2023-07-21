import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import {BASE_URL} from '../../../../config'

const ExamList = () => {
  const [exams, setExams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/exam/allexams`)
      .then((response) => {
        setExams(response.data.exams);
      })
      .catch((error) => {
        console.error('Failed to fetch exams:', error);
      });
  }, []);

  const handleDeleteExam = (examId) => {
    axios.delete(`${BASE_URL}/api/exam/byid/${examId}`)
      .then((response) => {
        setExams(exams.filter((exam) => exam._id !== examId));
      })
      .catch((error) => {
        console.error('Failed to delete exam:', error);
      });
  };

  const handleChangeStatus = (examId, newStatus) => {
    axios.put(`${BASE_URL}/api/exam/byid/${examId}/toggleStatus`, { status: newStatus })
      .then((response) => {
        setExams(exams.map((exam) => exam._id === examId ? { ...exam, status: newStatus } : exam));
      })
      .catch((error) => {
        console.error('Failed to change exam status:', error);
      });
  };

  const AddExam = () => {
    navigate("/dashboard/add-exam");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            {/* Dashboard actions */}
            {/* Cards */}
            <div className="grid gap-6 grid-cols-15">
              {/* Table (Top Channels) */}
              <div className="p-4">
                <div className='flex justify-between m-2'>
                  <h1 className="text-2xl font-bold mb-4">Exam List</h1>
                  <button
                    className="px-4 py-2 mb-2 font-bold text-white bg-blue-700 rounded focus:outline-none focus:ring-2 md:mb-0 md:mr-2"
                    onClick={AddExam}
                  >
                    Add Exam
                  </button>
                </div>

                <table className="border-collapse border w-full">
                  <thead>
                    <tr className="border bg-gray-100">
                      <th className="p-2 text-center">EXAM NAME</th>
                      <th className="p-2 text-center">CREATED AT</th>
                      <th className="p-2 text-center">STATUS</th>
                      <th className="p-2 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => (
                      <tr key={exam._id} className="border">
                        <td className="p-2 text-center cursor-pointer">{exam.name}</td>
                        <td className="p-2 text-center">{formatDate(exam.createdAt)}</td>
                        <td className="p-2 text-center">{exam.status ? 'Active' : 'Inactive'}</td>
                        <td className="p-2 flex justify-evenly">
                          <Link to={`/dashboard/update/${exam._id}`} className="text-blue-600 font-bold mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          <button
                            type="button"
                            className="text-red-600 font-bold mr-2"
                            onClick={() => handleDeleteExam(exam._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <button
                            type="button"
                            className="text-green-600 font-bold"
                            onClick={() => handleChangeStatus(exam._id, !exam.status)}
                          >
                            <FontAwesomeIcon icon={faPowerOff} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamList;