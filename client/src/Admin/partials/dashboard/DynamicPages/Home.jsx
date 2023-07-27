import React, { useEffect } from 'react'
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from '../../../../config';
import axios from 'axios';

export default function Home() {
  const initialCarousel = {
    fileLink: ''
  };

  const initialDataCarousel = {
    Carousels: [initialCarousel]
  };

  const initialFaculty = {
    name: '',
    facultyImg: '',
    experience: '',
    collegeName: '',
    classroom: ''
  };

  const initialDataFaculty = {
    Faculties: [initialFaculty]
  };

  const initialStudents = {
    studentImg: '',
    description: '',
    air: null,
    exam: '',
    name: '',
    enrollmentNo: '',
    classRoomDetails: '',
  };

  const initialDataStudents = {
    Students: [initialStudents]
  };

  const initialPrograms = {
    title: '',
    description: ''
  };

  const initialDataPrograms = {
    Programs: [initialPrograms]
  };



  const [carousel, setCarousel] = useState(initialDataCarousel);
  const [faculty, setFaculty] = useState(initialDataFaculty);
  const [students, setStudents] = useState(initialDataStudents);
  const [programs, setPrograms] = useState(initialDataPrograms);


  const handleCarouselChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...carousel.Carousels];
    newLinks[index][name.slice(0, -2)] = value;
    setCarousel({
      ...carousel,
      Carousels: newLinks
    });
  };

  const handleFacultyChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...faculty.Faculties];
    newLinks[index][name.slice(0, -2)] = value;
    setFaculty({
      ...faculty,
      Faculties: newLinks
    });
  };

  const handleStudentsChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...students.Students];
    newLinks[index][name.slice(0, -2)] = value;
    setStudents({
      ...carousel,
      Students: newLinks
    });
  };

  const handleProgramsChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...programs.Programs];
    newLinks[index][name.slice(0, -2)] = value;
    setPrograms({
      ...carousel,
      Programs: newLinks
    });
  };

  // add *********************
  const handleAddCarousel = () => {
    setCarousel({
      ...carousel,
      Carousels: [...carousel.Carousels, initialCarousel]
    });
  };

  const handleAddFaculty = () => {
    setFaculty({
      ...faculty,
      Faculties: [...faculty.Faculties, initialFaculty]
    });
  };

  const handleAddStudent = () => {
    setStudents({
      ...students,
      Students: [...students.Students, initialStudents]
    });
  };

  const handleAddProgram = () => {
    setPrograms({
      ...programs,
      Programs: [...programs.Programs, initialPrograms]
    });
  };

  // remove ***********
  const handleRemoveCarousel = (index) => {
    const newLinks = [...carousel.Carousels];
    newLinks.splice(index, 1);
    setCarousel({
      ...carousel,
      Carousels: newLinks
    });
  };

  const handleRemoveFaculty = (index) => {
    const newLinks = [...faculty.Faculties];
    newLinks.splice(index, 1);
    setFaculty({
      ...faculty,
      Faculties: newLinks
    });
  };

  const handleRemoveStudent = (index) => {
    const newLinks = [...students.Students];
    newLinks.splice(index, 1);
    setStudents({
      ...carousel,
      Students: newLinks
    });
  };

  const handleRemoveProgram = (index) => {
    const newLinks = [...programs.Programs];
    newLinks.splice(index, 1);
    setPrograms({
      ...carousel,
      Programs: newLinks
    });
  };

  const fetchHomeContent = async () => {
    try {
      const responseCarousel = await axios.get(
        `${BASE_URL}carousel/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      setCarousel({
        Carousels: responseCarousel.data[0].images.map(imageLink => ({
          fileLink: imageLink
        })
        )
      })
      const responsePrograms = await axios.get(`${BASE_URL}ourPrograms/get/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      console.log(responsePrograms.data[0]);
      setPrograms({
        Programs: responsePrograms.data[0].programs.map(programObj => ({
          title: programObj.title,
          description: programObj.description
        })
        )
      })
      const responseFaculty = await axios.get(
        `${BASE_URL}facultyHomePage/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      console.log(responseFaculty.data[0]);
      setFaculty({
        Faculties: responseFaculty.data[0].facultyMembers.map(facultyObj => ({
          name: facultyObj.name,
          facultyImg: facultyObj.facultyImg,
          classroom: facultyObj.classroom,
          collegeName: facultyObj.collegeName,
          experience: facultyObj.experience
        })
        )
      })
      const responseStudent = await axios.get(
        `${BASE_URL}studentHomePage/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      setStudents(responseStudent.data[0].Students)
    } catch (err) {
      console.log(err, 'error')
    }
  }

  useEffect(() => {
    fetchHomeContent()
    console.log(students);
  }, [])

  const handleSubmit = () => {
    // Submit the data to the backend (You can use fetch or Axios to send data to the backend API)
    // For this example, we'll log the data to the console.
    // console.log(students[0].);
    const formDataObj = {
      carousel: carousel.Carousels.map(link => link.fileLink),
      faculty: faculty.Faculties.map(facultyObj => facultyObj),
      selectedStudents: students.Students,
      programs: programs.Programs
    }
    console.log(formDataObj)
    const token = localStorage.getItem("token");

    const requestBodyCarousel = JSON.stringify(formDataObj.carousel);
    const requestBodyFaculty = JSON.stringify(formDataObj.faculty);
    const requestBodyPrograms = JSON.stringify(formDataObj.programs);
    const requestBodyStudents = JSON.stringify(formDataObj.selectedStudents);


    // uploading carousel
    fetch(`${BASE_URL}carousel/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: requestBodyCarousel,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
      });


    // uploading Faculties
    // not working have an issue of requestBodyFaculty 
    fetch(`${BASE_URL}facultyHomePage/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: requestBodyFaculty,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
      });
    // uploading programs
    fetch(`${BASE_URL}ourPrograms/upload/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: requestBodyPrograms,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Oops something went wrong!!!");
      });

    // studentCards Page
    fetch(`${BASE_URL}studentHomePage/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: requestBodyStudents,
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
    //   setFormData(initialData);
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
            <div className="container p-6 mx-auto overflow-x-auto font-mono">
              {/*---------> Table (Top Channels) */}

              <h1 className="mb-4 text-2xl font-bold text-center">Home</h1>
              <div className="max-w-3xl px-4 py-8 mt-6 mb-6 mx-auto rounded-lg shadow-xl border-[2px] border-black">
                <form className="flex flex-col">
                  <div className="border-[2px] border-black/20 p-4 rounded-md">
                    {/* Carousel Links */}
                    <h2 className="my-4 text-xl font-bold">Carousel Links</h2>
                    {carousel.Carousels.map((carousel, index) => (
                      <div key={index} className="gap-4 mb-4 rounded-lg">
                        <div className="flex items-center justify-between gap-4">
                          <div className="grid grid-cols-1 gap-4">
                            <label className="relative block mb-2 font-semibold">
                              {`Carousel Link ${index + 1}`}
                              <input
                                required
                                type="text"
                                name={`fileLink-${index}`}
                                value={carousel.fileLink}
                                onChange={(e) => handleCarouselChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />
                            </label>
                          </div>
                          <button
                            className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                            type="button"
                            onClick={() => handleRemoveCarousel(index)}
                          >
                            Remove Link
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="px-4 py-2 mx-1 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                      type="button"
                      onClick={handleAddCarousel}
                    >
                      Add Link
                    </button>
                  </div>

                    {/*<h2 className="my-4 text-xl font-bold">Students</h2>
                    {students.map((student, index) => (
                      <div key={index} className="gap-4 mb-4 rounded-lg">
                        <div key={index} className="gap-4 mb-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-4">
                            <label className="relative block mb-2 font-semibold">
                              {`Student ${index + 1} Name`}
                              <input
                                required
                                type="text"
                                name={`name-${index}`}
                                value={student.name}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />
                            </label>
                            <label className="relative block mb-2 font-semibold">
                              {`Student ${index + 1} Image`}
                              <input
                                required
                                type="text"
                                name={`studentImg-${index}`}
                                value={student.studentImg}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />
                            </label>
                            <label className="relative block mb-2 font-semibold">
                              {`Student ${index + 1} EnrollmentNo`}
                              <input
                                required
                                type="text"
                                name={`enrollmentNo-${index}`}
                                value={student.enrollmentNo}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />
                            </label>
                            <label className="relative block mb-2 font-semibold">
                              {`Student ${index + 1} Classroom Program`}
                              <input
                                required
                                type="text"
                                name={`classRoomDetails-${index}`}
                                value={student.classRoomDetails}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />
                            </label>


                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <label className="relative block mb-2 font-semibold">
                              {`Student ${index + 1} AIR`}
                              <input
                                required
                                type="text"
                                name={`air-${index}`}
                                value={student.air}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />
                            </label>
                            <label className="relative block mb-2 font-semibold">
                              {`Student ${index + 1} Exam`}
                              <input
                                required
                                type="text"
                                name={`exam-${index}`}
                                value={student.exam}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />
                            </label>
                            <label className="relative block col-span-2 mb-2 font-semibold">
                              {`Student ${index + 1} Description`}
                              <textarea
                                required
                                type="text"
                                name={`description-${index}`}
                                value={student.description}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />
                            </label>
                          </div>
                          <button
                            className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                            type="button"
                            onClick={() => handleRemoveStudent(index)}
                          >
                            Remove Link
                          </button>
                        </div>

                        <button
                          className="px-4 py-2 mx-1 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                          type="button"
                          onClick={handleAddStudent}
                        >
                          Add Link
                        </button>
                      </div>
                    ))}
                  </div> */}

                  <div className="border-[2px] border-black/20 p-4 rounded-md mt-5">
                    {/* Faculty */}
                    <h2 className="my-4 text-xl font-bold">Faculty</h2>
                    {faculty.Faculties.map((faculty, index) => (
                      <div key={index} className="gap-4 mb-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <label className="relative block mb-2 font-semibold">
                            {`Faculty ${index + 1} Image`}
                            <input
                              required
                              type="text"
                              name={`name-${index}`}
                              value={faculty.name}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {`Faculty ${index + 1} Image`}
                            <input
                              required
                              type="text"
                              name={`facultyImg-${index}`}
                              value={faculty.facultyImg}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {`Faculty ${index + 1} College`}
                            <input
                              required
                              type="text"
                              name={`collegeName-${index}`}
                              value={faculty.collegeName}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {`Faculty ${index + 1} Classroom`}
                            <input
                              required
                              type="text"
                              name={`classroom-${index}`}
                              value={faculty.classroom}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {`Faculty ${index + 1} Experience`}
                            <textarea
                              required
                              type="text"
                              name={`experience-${index}`}
                              value={faculty.experience}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <div className="mt-6">
                            <button
                              className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                              type="button"
                              onClick={() => handleRemoveFaculty(index)}
                            >
                              Remove Link
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      className="px-4 py-2 mx-1 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                      type="button"
                      onClick={handleAddFaculty}
                    >
                      Add Link
                    </button>
                  </div>

                  <div className="border-[2px] border-black/20 p-4 rounded-md mt-5">
                    {/* Programs */}
                    <h2 className="my-4 text-xl font-bold">Programs</h2>
                    {programs.Programs.map((program, index) => (
                      <div key={index} className="gap-4 mb-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <label className="relative block mb-2 font-semibold">
                            {`Program ${index + 1} Title`}
                            <input
                              required
                              type="text"
                              name={`title-${index}`}
                              value={program.title}
                              onChange={(e) => handleProgramsChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {`Program ${index + 1} Description`}
                            <input
                              required
                              type="text"
                              name={`description-${index}`}
                              value={program.description}
                              onChange={(e) => handleProgramsChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <button
                              className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                              type="button"
                              onClick={() => handleRemoveProgram(index)}
                            >
                              Remove Link
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      className="px-4 py-2 mx-1 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                      type="button"
                      onClick={handleAddProgram}
                    >
                      Add Link
                    </button>
                  </div>

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