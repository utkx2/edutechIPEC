import { useState, useEffect } from "react";
import IndianStates from "../constants/IndianStates";
import { BASE_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Registration = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [emailAlreadyPresent, setEmailAlreadyPresent] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    fatherNumber: "",
    motherName: "",
    motherNumber: "",
    dob: "",
    category: "General",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    zipCode: "",
    message: "",
    price: "",
    start: "",
  });
  const clearInputs = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
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
      zipCode: "",
      message: "",
    });
  };
  const handleZipCodeKeyPress = (e) => {
    const key = e.key;
    if (key === "e") {
      e.preventDefault();
    }
  };
  useEffect(() => {
    // console.log(id, "id");
    fetch(`${BASE_URL}QuickLinkHomePage/get/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setFormData(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  const [genderSelected, setGenderSelected] = useState(false);
  const [categorySelected, setcategorySelected] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailAlreadyPresent(false);
    }
    if (e.target.name === "gender") {
      setGenderSelected(true);
    }
    if (e.target.name === "category") {
      setcategorySelected(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categorySelected) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}upload1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        // toast.success("admin card sent on your mail");
      } else {
        toast.error("error during submission of form");
      }
    } catch (error) {
      alert("Error submitting form");
    }

    const encodedFirstName = encodeURIComponent(formData.firstName);
    const encodedLastName = encodeURIComponent(formData.lastName);
    const encodedEmail = encodeURIComponent(formData.email);
    const encodedPhone = encodeURIComponent(formData.phoneNumber);

    navigate(`/confirm-payment?id=${id}&firstName=${encodedFirstName}&lastName=${encodedLastName}&email=${encodedEmail}&phone=${encodedPhone}`, { state: formData });
    // clearInputs();
  };
  return (
    <div className="flex items-center justify-center w-full p-4 py-10 bg-[#d1e9f9]">
      <div>
        <div className="max-w-[1444px] border py-6 px-12 shadow-lg bg-white">
          <h1 className=" text-3xl text-[#1f1d5a] font-bold text-center">
            REGISTRATION FORM
          </h1>
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="firstName"
                  id="floating_first_name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="lastName"
                  id="floating_last_name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="floating_email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
                {emailAlreadyPresent && (
                  <p className="text-red-500 text-sm mt-1">
                    Email is already registered.
                  </p>
                )}
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  hidden
                  type="text"
                  name="amount"
                  id="floating_price"
                  value={formData.price} // Assuming formData.price contains the value
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  // placeholder=" "
                  required
                  readOnly
                />
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  hidden
                  type="text"
                  name="productinfo"
                  id="floating_description"
                  value={formData.start} // Assuming formData.start contains the value
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  readOnly
                />
              </div>

            </div>
            <div className="relative z-0 flex flex-col w-full mb-6 gap-y-2 group">
              <label
                htmlFor=""
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Choose Class
              </label>
              <div className="flex flex-wrap items-center justify-start w-full gap-2">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="Class 9"
                    name="selectedClass"
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-5"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Class 12 pass
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-6"
                    type="radio"
                    value="JEE"
                    name="selectedExam"
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-5"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    JEE
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-7"
                    type="radio"
                    value="NEET"
                    name="selectedExam"
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-5"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    NEET
                  </label>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="phoneNumber"
                  id="floating_phone"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div>
              <div className="relative z-0 flex flex-col h-10 mb-6 gap-y-2 group">
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
                      className="w-4 h-4 text-blue-600 bg-gray-100 bg-green-300 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
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
                      className="w-4 h-4 text-blue-600 bg-gray-100 bg-green-300 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-100 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-radio-6"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                    <div className="text-center">
                      {!genderSelected && (
                        <p className="text-red-500 text-sm mt-0 md:mt-2">
                          Please select a gender
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="fatherName"
                  id="floating_father_name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Father name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="fatherNumber"
                  id="floating_father_number"
                  value={formData.fatherNumber}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Father mobile Number
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="motherName"
                  id="floating_mother_name"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mother name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="motherNumber"
                  id="floating_mother_number"
                  value={formData.motherNumber}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mother Mobile Number
                </label>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <div>
                <label className="mt-2 mr-5" htmlFor="dob">
                  DOB:
                </label>
                <div>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Date of Birth"
                    style={{ color: "black", width: "100%" }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  style={{ color: "black" }}
                >
                  Select Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose Category</option>
                  <option></option>
                  <option value="gen">General</option>
                  <option value="ews">EWS</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="dis">Disability</option>
                </select>
                {categorySelected === false && (
                  <p className="text-red-500 text-sm mt-2">
                    Please select category
                  </p>
                )}
              </div>
            </div>
            <form className="mt-4">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="addressLine1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address Line 1
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="addressLine2"
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="addressLine2"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address Line 2 (Required)
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="addressLine3"
                  id="addressLine3"
                  value={formData.addressLine3}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="addressLine3"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address Line 3
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="city"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    City
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <div className="relative z-0 w-full group">
                    <select
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      style={{ color: "black" }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  <input
                    type="number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="zipCode"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onKeyPress={handleZipCodeKeyPress}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="zipcode"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Zipcode
                  </label>
                </div>
              </div>
            </form>
            <textarea
              id="message"
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            <button
              type="submit"
              className="my-10 text-white bg-[#1f1d5a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={!genderSelected || !categorySelected}
            >
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
export default Registration;
