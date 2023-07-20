import React from 'react'
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from '../../../../config';

export default function MedicalBrochure() {
    const initialStudent = {
      fileLink: ''
    };
  
    const initialData = {
      examName: '',
      Links: [initialStudent]
    };
  
    const [formData, setFormData] = useState(initialData);
  
    const handleLinkChange = (index, event) => {
      const { name, value } = event.target;
      const newLinks = [...formData.Links];
      newLinks[index][name.slice(0,-2)] = value;
      setFormData({
        ...formData,
        Links: newLinks
      });
    };
  
    const handleAddStudent = () => {
      setFormData({
        ...formData,
        Links: [...formData.Links, initialStudent]
      });
    };
  
    const handleRemoveStudent = (index) => {
      const newLinks = [...formData.Links];
      newLinks.splice(index, 1);
      setFormData({
        ...formData,
        Links: newLinks
      });
    };
  
    const handleSubmit = () => {
      // Submit the data to the backend (You can use fetch or Axios to send data to the backend API)
      // For this example, we'll log the data to the console.
      const formDataObj = {
        examName: "Medical",
        fileLink: formData.Links.map(link => link.fileLink)
    }
    console.log(formDataObj)
      const token = localStorage.getItem("token");

    const requestBody = JSON.stringify(formDataObj);

        fetch(`${BASE_URL}/api/download/brochure/upload`, {
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

                            <h1 className="mb-4 text-2xl font-bold">Medical Brochure</h1>
                            <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl border-[2px] border-black">
                            <form className='flex flex-col'>
                              <h2 className='my-4 text-xl font-bold'>Brochure Links</h2>
                              {formData.Links.map((link, index) => (
                                <div key={index} className='gap-4 p-4 border-[2px] border-black/20 rounded-lg mb-4'>
                                  <div className='flex items-center justify-between gap-4 '>
                                    {/* <h1 className='font-semibold'>{`Link ${index+1}`}</h1> */}
                                    <label className="relative block mb-2 font-semibold">
                                      {`Link ${index+1}`}
                                      <input
                                      required
                                        type="text"
                                        name={`fileLink-${index}`}
                                        value={link.fileLink}
                                        onChange={(e) => handleLinkChange(index, e)}
                                        className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                      />
                                    </label>
                                    <button
                                      className="px-4 py-2 mx-6 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                                     type="button" onClick={() => handleRemoveStudent(index)}>
                                      Remove Link
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <button 
                                className="px-4 py-2 mx-6 mt-8 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                              type="button" onClick={handleAddStudent}>
                                Add Link
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

