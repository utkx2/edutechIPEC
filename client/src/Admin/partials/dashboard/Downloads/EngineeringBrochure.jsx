import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar';
import Header from '../../Header';
import { BASE_URL } from '../../../../config';
import BrochurePdfUploader from './BrochurePdfUploader';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EngineeringBrochure() {
  const initialData = {
    examName: 'Engineering',
    Links: ['']
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}download/brochure/get`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        // console.log(data);

        if (data.length > 0) {
          // Update the state with the fetched data
          setFormData({
            ...formData,
            Links: data[0].fileLink || [''],
          });
        }

        // console.log(formData);
      } catch (error) {
        console.error('Error fetching brochure data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLinkChange = (index, event) => {
    const { value } = event.target;
    const newLinks = [...formData.Links];
    newLinks[index] = value;
    setFormData({
      ...formData,
      Links: newLinks,
    });
  };

  const handleAddLink = () => {
    setFormData({
      ...formData,
      Links: [...formData.Links, ''],
    });
  };

  const handleRemoveLink = (index) => {
    const newLinks = [...formData.Links];
    newLinks.splice(index, 1);
    setFormData({
      ...formData,
      Links: newLinks,
    });
  };

  const handleSubmit = () => {
    // Submit the data to the backend
    const token = localStorage.getItem('token');

    fetch(`${BASE_URL}download/brochure/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        examName: formData.examName,
        fileLink: formData.Links,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('success'
        //   // , data
        // );
        toast.success('Pdf Links Updated successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error("Oops! Something went wrong");
      });
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <main>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <div className="container p-6 mx-auto overflow-x-auto font-mono">
              <h1 className="mb-4 text-2xl font-bold">Engineering Brochure</h1>
              <div className="max-w-3xl px-4 py-8 mt-6 mb-6 rounded-lg shadow-xl border-[2px] border-black">
                <form className="flex flex-col">
                  <h2 className="my-4 text-xl font-bold">Brochure Links</h2>
                  {formData.Links.map((link, index) => (
                    <div key={index} className="gap-4 p-4 border-[2px] border-black/20 rounded-lg mb-4">
                      <div className="flex items-center justify-between gap-4 ">
                        <label className="relative block mb-2 font-semibold">
                          {`Link ${index + 1}`}
                          <input
                            required
                            type="text"
                            name={`fileLink-${index}`}
                            value={link}
                            onChange={(e) => handleLinkChange(index, e)}
                            className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                          />
                        </label>
                        <BrochurePdfUploader photos={formData} onChange={setFormData} index={index} />
                        <button
                          className="px-4 py-2 mx-6 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                        >
                          Remove Link
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="px-4 py-2 mx-6 mt-8 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                    type="button"
                    onClick={handleAddLink}
                  >
                    Add Link
                  </button>

                  <button
                    className="px-4 py-2 mx-6 mt-8 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}