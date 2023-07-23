import React from 'react'
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from '../../../../config';

export default function Result() {
  const initialStudent = {
    centreName: '',
    studentName: '',
    IPECRollNo: '',
    CRLRank: ''
  };

  const initialData = {
    examName: '',
    students: [initialStudent]
  };

  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStudentChange = (index, event) => {
    const { name, value } = event.target;
    const newStudents = [...formData.students];
    newStudents[index][name.slice(0, -2)] = value;
    setFormData({
      ...formData,
      students: newStudents
    });
  };

  const handleAddStudent = () => {
    setFormData({
      ...formData,
      students: [...formData.students, initialStudent]
    });
  };

  const handleRemoveStudent = (index) => {
    const newStudents = [...formData.students];
    newStudents.splice(index, 1);
    setFormData({
      ...formData,
      students: newStudents
    });
  };

  const handleSubmit = () => {
    // Submit the data to the backend (You can use fetch or Axios to send data to the backend API)
    // For this example, we'll log the data to the console.
    const formDataObj = {
      examName: formData.examName,
      students: formData.students
    }
    const token = localStorage.getItem("token");

    const requestBody = JSON.stringify(formDataObj);

    fetch(`${BASE_URL}results/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
      });
    // Reset the form after submission
    setFormData(initialData);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
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
              {/*---------> Table (Top Channels) */}

              <h1 className="mb-4 text-2xl font-bold">Result</h1>
              <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl border-[2px] border-black">
                <form className='flex flex-col'>
                  <label className="relative block mb-2 font-semibold">
                    Exam Name:
                    <input
                      required
                      type="text"
                      name="examName"
                      value={formData.examName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 mt-1 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                    />
                  </label>
                  <h2 className='my-4 text-xl font-bold'>Students</h2>
                  {formData.students.map((student, index) => (
                    <div key={index} className='grid md:grid-cols-4 grid-cols-2 gap-4 p-4 border-[2px] border-black/20 rounded-lg mb-4'>
                      <div className='flex items-baseline justify-between col-span-2 gap-4 md:col-span-4'>
                        <h1 className='font-semibold'>{`Student ${index + 1}`}</h1>
                        <button
                          className="px-4 py-2 mx-6 mt-8 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                          type="button" onClick={() => handleRemoveStudent(index)}>
                          Remove Student
                        </button>
                      </div>
                      <label className="relative block mb-2  font-semibold">
                        Centre Name:
                        <input
                          required
                          type="text"
                          name={`centreName-${index}`}
                          value={student.centreName}
                          onChange={(e) => handleStudentChange(index, e)}
                          className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                      </label>
                      <label className="relative block mb-2 font-semibold">
                        Student Name
                        <input
                          required
                          type="text"
                          name={`studentName-${index}`}
                          value={student.studentName}
                          onChange={(e) => handleStudentChange(index, e)}
                          className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                      </label>
                      <label className="relative block mb-2 font-semibold">
                        IPEC Roll No
                        <input
                          required
                          type="text"
                          name={`IPECRollNo-${index}`}
                          value={student.IPECRollNo}
                          onChange={(e) => handleStudentChange(index, e)}
                          className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                      </label>
                      <label className="relative block mb-8 md:mb-2 font-semibold">
                        CRL Rank:
                        <span className="absolute  mt-20 md:mt-0 top-[-12px] left-0 text-red-700 text-[12px]">{'(must be a number)'}</span>
                        <input
                          required
                          type="number"
                          name={`CRLRank-${index}`}
                          value={student.CRLRank}
                          onChange={(e) => handleStudentChange(index, e)}
                          className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                        />
                      </label>
                    </div>
                  ))}
                  <button
                    className="px-4 py-2 mx-6 mt-8 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                    type="button" onClick={handleAddStudent}>
                    Add Student
                  </button>

                  <button
                    className="px-4 py-2 mx-6 mt-8 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                    type="button" onClick={handleSubmit}>Submit</button>
                </form>

              </div>

            </div>
          </div>
        </main>

      </div>
    </div>
  )
}
