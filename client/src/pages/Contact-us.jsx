import React, { useState } from 'react'
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail, AiOutlineMessage } from "react-icons/ai";
import axios from "axios"

import { RiBuilding2Line, RiMapPin2Line } from "react-icons/ri";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const sendDataToAPI = () => {
    const formData = {
      name,
      mobile,
      email,
      message,
    };
    // const token = localStorage.getItem('token');
    axios
      .post("http://localhost:3000/api/Contact/upload", formData, {

      })
      .then((response) => {
        alert("We will contact you soon!!!")
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
        alert("Oops something went wrong!!!")
      });
  };



  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendDataToAPI();
    setName("");
    // setCompany("");
    setMobile("");
    setEmail("");
    setMessage("");
    setSelectedService("");
  };
  return (
    <div className="container mx-auto py-8 md:max-w-7xl">
      <div className="space-y-8">
        <div className="flex items-center justify-center flex-col md:flex-row">
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1687066253~exp=1687066853~hmac=42f23f007ad72bd2ca440a69684ce6508082c1182b3c54179addffc4163960af"
            className="w-4/5 md:w-1/2"
            alt="Contact illustration"
          />
          <form
            onSubmit={handleFormSubmit}
            className="md:w-2/3 mx-auto border-2 p-8 rounded-xl shadow-md"
          >
            <h1 className="text-3xl font-bold text-center mb-4">
              Provide Your Details
            </h1>
            <div className="mb-4">
              <label htmlFor="name" className="flex items-center">
                <AiOutlineUser className="mr-2" />
                Name
              </label>
              <input required
                type="text"
                id="name"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="flex items-center">
                <AiOutlinePhone className="mr-2" />
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="flex items-center">
                <AiOutlineMail className="mr-2" />
                Email Address
              </label>
              <input required
                type="email"
                id="email"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="flex items-center">
                <AiOutlineMessage className="mr-2" />
                Message
              </label>
              <textarea
                required
                type="text"
                id="message"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 text-[#1f1d5a] hover:bg-[#1f1d5a] hover:text-yellow-400 py-2 px-4 rounded transition-colors duration-300 w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
