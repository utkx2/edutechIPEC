import React, { useState, useEffect } from "react";
import IndianStates from "../constants/IndianStates";
import { ProgressBar, Step } from "react-step-progress-bar";

const Registration = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    retypeEmail: "",
    phoneNumber: "",
    fatherName: "",
    fatherNumber: "",
    motherName: "",
    motherNumber: "",
    dob: "",
    category: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    zipcode: "",
    message: "",
  });

  const clearInputs = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
      retypeEmail: "",
      phoneNumber: "",
      fatherName: "",
      fatherNumber: "",
      motherName: "",
      motherNumber: "",
      dob: "",
      category: "",
      gender: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      state: "",
      zipcode: "",
      message: "",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (id) => {
    // Perform update logic here with the updated form data
    // You can send a request to the API to update the data
    // After updating, set isEditing to false to exit editing mode
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== formData.retypeEmail) {
      alert("Emails do not match");
      return;
    }

    try {
      const response = await fetch("api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Form submitted successfully", responseData);
        alert("Form submitted successfully");
      } else {
        console.log("Form submission failed", response.statusText);
        alert("Form submission failed");
      }
    } catch (error) {
      console.log("Error submitting form", error);
      alert("Error submitting form");
    }
    clearInputs();
  };

  const stepNames = ["Tender Name", "Company Name" /* Add step names here */];
  const progress = Math.round(
    (formData.currentStep / (stepNames.length - 1)) * 100
  );
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render the Sidebar and Header components similar to AuctionMaterialDetail */}
      {/* ... */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto">
        <main>
          {/* Site header */}
          {/* ... */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-2xl p-20 w-full lg:w-3/4">
                {/* Add ProgressBar component */}
                <ProgressBar
                  percent={progress}
                  filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                >
                  {stepNames.map((_, index) => (
                    <Step key={index}>
                      {({ accomplished }) => (
                        <div
                          className={`step ${
                            accomplished ? "completed" : null
                          }`}
                        />
                      )}
                    </Step>
                  ))}
                </ProgressBar>
                <h1 className=" text-3xl text-[#1f1d5a] font-bold text-center">
                  REGISTRATION FORM
                </h1>
                <form onSubmit={handleSubmit} className="mt-5">
                  <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                      <div>
                        <label className="block mb-2 text-xl font-medium">
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="floating_first_name"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                          placeholder=" "
                          required
                        />
                      </div>
                      <div></div>
                      {/* <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        First name
                      </label> */}
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <div>
                            <label className="block mb-2 text-xl font-medium">
                            Last name
                            </label>
                            <input
                            type="text"
                            name="lastName"
                            id="floating_last_name"
                            value={formData.lastName}
                            onChange={handleChange}
                             className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                            placeholder=" "
                            required
                            />
                        </div>
                    </div>
                        {/* <label
                          htmlFor="floating_last_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last name
                        </label> */}
                      </div>
                    
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-xl font-medium">
                    Email name
                            </label>
                      <input
                        type="email"
                        name="email"
                        id="floating_email"
                        value={formData.email}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email address
                      </label> */}
                    </div>
                  </div>

                  <div className="relative z-0 flex flex-col w-full mb-6 gap-y-2 group">
                    <label
                      htmlFor=""
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      Choose Class
                    </label>
                    <div className="flex items-center justify-start w-full gap-x-4">
                      <div className="flex items-center">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="Class 9"
                          name="selectedClass"
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Class 9
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="default-radio-2"
                          type="radio"
                          value="Class 10"
                          name="selectedClass"
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Class 10
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="default-radio-3"
                          type="radio"
                          value="Class 11"
                          name="selectedClass"
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-3"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Class 11
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="default-radio-4"
                          type="radio"
                          value="Class 12"
                          name="selectedClass"
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-4"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Class 12
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="default-radio-5"
                          type="radio"
                          value="Class 12 pass"
                          name="selectedClass"
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-5"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Class 12 pass
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-xl font-medium">
                    Phone number
                        </label>
                      <input
                        type="number"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        name="phoneNumber"
                        id="floating_phone"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone number
                      </label> */}
                    </div>

                    <div className="relative z-0 flex flex-col h-10 gap-y-2 group">
                      <label
                        htmlFor=""
                        className="text-sm text-gray-500 dark:text-gray-400"
                      >
                        Choose Gender
                      </label>
                      <div className="flex items-start justify-start gap-x-4">
                        <div className="items-center pl-4 rounded basis-1/2 dark:border-gray-700">
                          <input
                            id="bordered-radio-6"
                            type="radio"
                            value="male"
                            name="gender"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 bg-green-300 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="bordered-radio-6"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Male
                          </label>
                        </div>

                        <div className="items-center pl-4 rounded basis-1/2 dark:border-gray-700">
                            
                          <input
                            id="bordered-radio-7"
                            type="radio"
                            value="female"
                            name="gender"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 bg-green-300 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="bordered-radio-6"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-xl font-medium">
                    Father name
                        </label>
                      <input
                        type="text"
                        name="fatherName"
                        id="floating_father_name"
                        value={formData.fatherName}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Father name
                      </label> */}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-xl font-medium">
                    Father mobile Number
                        </label>
                      <input
                        type="number"
                        name="fatherNumber"
                        id="floating_father_number"
                        value={formData.fatherNumber}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Father mobile Number
                      </label> */}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-xl font-medium">
                    Mother name
                        </label>
                      <input
                        type="text"
                        name="motherName"
                        id="floating_mother_name"
                        value={formData.motherName}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="floating_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Mother name
                      </label> */}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-xl font-medium">
                    Mother Mobile Number
                        </label>
                      <input
                        type="number"
                        name="motherNumber"
                        id="floating_mother_number"
                        value={formData.motherNumber}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="floating_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Mother Mobile Number
                      </label> */}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div>
                      <label className="block mb-2 text-xl font-medium" htmlFor="dob">
                        DOB:
                      </label>
                      <div>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                          placeholder="Date of Birth"
                          style={{ color: "black", width: "100%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block mb-2 text-xl font-medium"
                        style={{ color: "black" }}
                      >
                        Select Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                      >
                        <option disabled>Choose Category</option>
                        <option value="gen">General</option>
                        <option value="ews">EWS</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                        <option value="dis">Disability</option>
                      </select>
                    </div>
                  </div>

                  <form className="mt-4">
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="f mb-2 text-xl font-medium">
                    Address Line 1</label>
                      <input
                        type="text"
                        name="addressLine1"
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="addressLine1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Address Line 1
                      </label> */}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-xl font-medium">
                    Address Line 2</label>
                      <input
                        type="text"
                        name="addressLine2"
                        id="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="addressLine2"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Address Line 2
                      </label> */}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <label className="block mb-2 text-xl font-medium">
                    Address Line 3</label>
                      <input
                        type="text"
                        name="addressLine3"
                        id="addressLine3"
                        value={formData.addressLine3}
                        onChange={handleChange}
                         className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                        placeholder=" "
                        required
                      />
                      {/* <label
                        htmlFor="addressLine3"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Address Line 3
                      </label> */}
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                      <label className="block mb-2 text-xl font-medium">
                      City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={formData.city}
                          onChange={handleChange}
                           className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                          placeholder=" "
                          required
                        />
                        {/* <label
                          htmlFor="city"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          City
                        </label> */}
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <div className="relative z-0 w-full group">
                            
                          <select
                            required
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            style={{ color: "black" }}
                            className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full mt-8"
                            placeholder="Select State"
                          >
                            <option value="">Select State</option>
                            {IndianStates.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                      <label className="block mb-2 text-xl font-medium">
                      Zipcode</label>
                        <input
                          type="tel"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          name="zipcode"
                          id="zipcode"
                          value={formData.zipcode}
                          onChange={handleChange}
                           className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                          placeholder=" "
                          required
                        />
                        {/* <label
                          htmlFor="zipcode"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Zipcode
                        </label> */}
                      </div>
                    </div>
                  </form>

                  <textarea
                    id="message"
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border text-lg border-gray-300 py-4 bg-gray-200 rounded-md px-9 p-2 w-full"
                    placeholder="Write your thoughts here..."
                  ></textarea>

                  <div className="flex justify-between mt-8">
                    <div>
                      {isEditing ? (
                        <button
                          className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                          // onClick={() => handleUpdate(formData._id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <div>
                      <button
                        className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                        //   onClick={() => updateDetails(formData._id)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Registration;
