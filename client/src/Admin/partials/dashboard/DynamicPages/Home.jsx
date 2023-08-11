import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { BASE_URL } from "../../../../config";
import axios from "axios";
import PhotoUploader from "./PhotoUploader";
import StudentPhotoUploader from "./StudentPhotoUploader";
import FacultyPhotoUploader from "./FacultyPhotoUploader";
import QuickLinksPhotoUploader from "./QuickLinksPhotoUploader";
export default function Home() {
  const initialCarousel = {
    fileLink: "",
  };
  const initialDataCarousel = {
    Carousels: [initialCarousel],
  };
  const initialFaculty = {
    name: "",
    facultyImg: "",
    experience: "",
    collegeName: "",
    classroom: "",
  };
  const initialDataFaculty = {
    Faculties: [initialFaculty],
  };
  const initialQuickLinks = {
    end: "",
    image: "",
    number: "",
    price: "",
    product: "",
    start: "",
  };
  const initialDataQuickLinks = {
    QuickLinks: [initialQuickLinks],
  };
  const initialStudents = {
    studentImg: "",
    description: "",
    air: null,
    exam: "",
    name: "",
    enrollmentNo: "",
    classRoomDetails: "",
  };
  const initialDataStudents = {
    Students: [initialStudents],
  };
  const initialPrograms = {
    title: "",
    description: "",
  };
  const initialDataPrograms = {
    Programs: [initialPrograms],
  };
  const [carousel, setCarousel] = useState(initialDataCarousel);
  const [carouselCount, setcarouselCount] = useState(0);
  const [faculty, setFaculty] = useState(initialDataFaculty);
  const [facultyCount, setfacultyCount] = useState(0);
  const [quickLinks, setquickLinks] = useState(initialDataQuickLinks);
  const [students, setStudents] = useState(initialDataStudents);
  const [studentsCount, setstudentsCount] = useState(0);
  const [programs, setPrograms] = useState(initialDataPrograms);
  const [photos, setPhotos] = useState([]);
  const [photoNumber, setPhotoNumber] = useState(null);
  const [studentPhotos, setStudentPhotos] = useState([]);
  const [quickLinksCount, setquickLinksCount] = useState(0);
  const [boolean, setBoolean] = useState(false);
  console.log(photos);
  useEffect(() => {
    setBoolean(true);
  }, [studentPhotos]);
  console.log(boolean);
  if (boolean) {
    const updatedStudents = {
      Students: students.Students.map((student, i) =>
        i === photoNumber
          ? { ...student, studentImg: studentPhotos[photoNumber] }
          : student
      ),
    };
    // Now set the updated students object as the new state
    setStudents(updatedStudents);
    setBoolean(false);
    console.log(students.Students);
  }
  console.log(faculty);
  console.log(carousel);
  console.log(photoNumber);
  const handleItemClick = (index) => {
    setPhotos(carousel.Carousels);
    setPhotoNumber(index);
    console.log(carousel.Carousels[index].fileLink);
    carousel.Carousels[index].fileLink = photos[index];
    console.log(carousel.Carousels[index].fileLink);
  };
  console.log(studentPhotos);
  console.log(students.Students);
  const studentsObj = students.Students;
  const imageLinks = studentsObj.map((student) => student.studentImg);
  const handleItemClickStudent = (index) => {
    if (photoNumber == null) {
      setStudentPhotos(imageLinks);
    }
    console.log("clicked");
    setPhotoNumber(index);
    console.log(students.Students[index]);
    console.log(studentPhotos[index]);
    console.log(students.Students[index].studentImg);
    const updatedStudents = {
      Students: students.Students.map((student, i) =>
        i === photoNumber
          ? { ...student, studentImg: studentPhotos[photoNumber] }
          : student
      ),
    };
    setStudents(updatedStudents);
  };
  const handleCarouselChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...carousel.Carousels];
    newLinks[index][name.slice(0, -2)] = value;
    setCarousel({
      ...carousel,
      Carousels: newLinks,
    });
  };
  const handleFacultyChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...faculty.Faculties];
    newLinks[index][name.slice(0, -2)] = value;
    setFaculty({
      ...faculty,
      Faculties: newLinks,
    });
  };
  const handleQuickLinksChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...quickLinks.QuickLinks];
    newLinks[index][name.slice(0, -2)] = value;
    setquickLinks({
      ...quickLinks,
      QuickLinks: newLinks,
    });
  };
  const handleStudentsChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...students.Students];
    newLinks[index][name.slice(0, -2)] = value;
    setStudents({
      ...carousel,
      Students: newLinks,
    });
  };
  const handleProgramsChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...programs.Programs];
    newLinks[index][name.slice(0, -2)] = value;
    setPrograms({
      ...carousel,
      Programs: newLinks,
    });
  };
  const handleAddCarousel = () => {
    setCarousel({
      ...carousel,
      Carousels: [...carousel.Carousels, initialCarousel],
    });
    setcarouselCount(carouselCount + 1);
  };
  const handleAddFaculty = () => {
    setFaculty({
      ...faculty,
      Faculties: [...faculty.Faculties, initialFaculty],
    });
    setfacultyCount(facultyCount + 1);
  };
  const handleAddQuickLinks = () => {
    setquickLinks({
      ...quickLinks,
      QuickLinks: [...quickLinks.QuickLinks, initialQuickLinks],
    });
    setquickLinksCount(quickLinksCount + 1);
  };
  const handleAddStudent = () => {
    setStudents({
      ...students,
      Students: [...students.Students, initialStudents],
    });
    setstudentsCount(studentsCount + 1);
  };
  const handleAddProgram = () => {
    setPrograms({
      ...programs,
      Programs: [...programs.Programs, initialPrograms],
    });
  };
  const handleRemoveCarousel = (index) => {
    const newLinks = [...carousel.Carousels];
    newLinks.splice(index, 1);
    setCarousel({
      ...carousel,
      Carousels: newLinks,
    });
  };
  const handleRemoveFaculty = (index) => {
    const newLinks = [...faculty.Faculties];
    newLinks.splice(index, 1);
    setFaculty({
      ...faculty,
      Faculties: newLinks,
    });
  };
  const handleRemoveQuickLinks = (index) => {
    const newLinks = [...quickLinks.QuickLinks];
    newLinks.splice(index, 1);
    setquickLinks({
      ...quickLinks,
      QuickLinks: newLinks,
    });
  };
  const handleRemoveStudent = (index) => {
    const newLinks = [...students.Students];
    newLinks.splice(index, 1);
    setStudents({
      ...carousel,
      Students: newLinks,
    });
  };
  const handleRemoveProgram = (index) => {
    const newLinks = [...programs.Programs];
    newLinks.splice(index, 1);
    setPrograms({
      ...carousel,
      Programs: newLinks,
    });
  };
  const fetchHomeContent = async () => {
    try {
      const responseCarousel = await axios.get(`${BASE_URL}carousel/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      setCarousel({
        Carousels: responseCarousel.data[0].images.map((imageLink) => ({
          fileLink: imageLink,
        })),
      });
      const responsePrograms = await axios.get(`${BASE_URL}ourPrograms/get/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      console.log(responsePrograms.data[0]);
      setPrograms({
        Programs: responsePrograms.data[0].programs.map((programObj) => ({
          title: programObj.title,
          description: programObj.description,
        })),
      });
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
        Faculties: responseFaculty.data[0].facultyMembers.map((facultyObj) => ({
          name: facultyObj.name,
          facultyImg: facultyObj.facultyImg,
          classroom: facultyObj.classroom,
          collegeName: facultyObj.collegeName,
          experience: facultyObj.experience,
        })),
      });
      const responseQuickLinks = await axios.get(
        `${BASE_URL}QuickLinkHomePage/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      console.log(responseQuickLinks.data[0], "quick");
      setquickLinks({
        QuickLinks: responseQuickLinks.data[0].quickLinks.map((facultyObj) => ({
          end: facultyObj.end,
          image: facultyObj.image,
          number: facultyObj.number,
          product: facultyObj.product,
          start: facultyObj.start,
        })),
      });
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
      console.log(responseStudent.data[0]);
      setStudents(responseStudent.data[0]);
    } catch (err) {
      console.log(err, "error");
    }
  };
  useEffect(() => {
    fetchHomeContent();
  }, []);
  const handleSubmit = () => {
    const formDataObj = {
      carousel: carousel.Carousels.map((link) => link.fileLink),
      faculty: faculty.Faculties.map((facultyObj) => facultyObj),
      quickLinks: quickLinks.QuickLinks.map((facultyObj) => facultyObj),
      selectedStudents: students.Students,
      programs: programs.Programs,
    };
    console.log(formDataObj);
    const token = localStorage.getItem("token");
    const requestBodyCarousel = JSON.stringify(formDataObj.carousel);
    const requestBodyFaculty = JSON.stringify(formDataObj.faculty);
    const requestBodyQuickLinks = JSON.stringify(formDataObj.quickLinks);
    const requestBodyPrograms = JSON.stringify(formDataObj.programs);
    const requestBodyStudents = JSON.stringify(formDataObj.selectedStudents);

    console.log(token);
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

    fetch(`${BASE_URL}QuickLinkHomePage/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: requestBodyQuickLinks,
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
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {" "}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />{" "}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <main>
          {" "}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />{" "}
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <div className="container p-6 mx-auto overflow-x-auto font-mono">
              {" "}
              <h1 className="mb-4 text-2xl font-bold text-center">Home</h1>
              <div className="max-w-3xl px-4 py-8 mt-6 mb-6 mx-auto rounded-lg shadow-xl border-[2px] border-black">
                <form className="flex flex-col">
                  <div className="border-[2px] border-black/20 p-4 rounded-md">
                    <h2 className="my-4 text-xl font-bold">Carousel Links</h2>
                    {carousel.Carousels.map((carousel, index) => (
                      <div key={index} className="gap-4 mb-4 rounded-lg">
                        <div className="flex items-center justify-between gap-4">
                          <div className="grid grid-cols-1 gap-4 ">
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
                            </label>{" "}
                          </div>{" "}
                          <div className="ml-20 flex ">
                            {" "}
                            <div onClick={() => handleItemClick(index)}>
                              {" "}
                              <PhotoUploader
                                photos={photos}
                                onChange={setPhotos}
                                index={index}
                              />{" "}
                            </div>{" "}
                            <button
                              className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                              type="button"
                              onClick={() => handleRemoveCarousel(index)}
                            >
                              {" "}
                              Remove Link{" "}
                            </button>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>
                    ))}{" "}
                    {carouselCount < 3 && carousel.Carousels.length < 3 && (
                      <button
                        className="px-4 py-2 mx-1 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                        type="button"
                        onClick={handleAddCarousel}
                      >
                        {" "}
                        Add Link{" "}
                      </button>)}{" "}
                  </div>{" "}
                  {students ? (
                    <div>
                      {" "}
                      <h2 className="my-4 text-xl font-bold">Students</h2>{" "}
                      {students.Students.map((student, index) => (
                        <div key={index} className="gap-4 mb-4 rounded-lg">
                          {" "}
                          <div className="grid grid-cols-2 gap-4">
                            {" "}
                            <label className="relative block mb-2 font-semibold">
                              {" "}
                              {`Student ${index + 1} Name`}{" "}
                              <input
                                required
                                type="text"
                                name={`name-${index}`}
                                value={student.name}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />{" "}
                            </label>{" "}
                            <label className="relative block mb-2 font-semibold">
                              {" "}
                              {`Student ${index + 1} Image`}{" "}
                              <input
                                required
                                type="text"
                                name={`studentImg-${index}`}
                                value={student.studentImg}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />{" "}
                            </label>{" "}
                            <label className="relative block mb-2 font-semibold">
                              {" "}
                              {`Student ${index + 1} EnrollmentNo`}{" "}
                              <input
                                required
                                type="text"
                                name={`enrollmentNo-${index}`}
                                value={student.enrollmentNo}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />{" "}
                            </label>{" "}
                            <label className="relative block mb-2 font-semibold">
                              {" "}
                              {`Student ${index + 1} Classroom Program`}{" "}
                              <input
                                required
                                type="text"
                                name={`classRoomDetails-${index}`}
                                value={student.classRoomDetails}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />{" "}
                            </label>{" "}
                          </div>{" "}
                          <div className="grid grid-cols-2 gap-4">
                            {" "}
                            <label className="relative block mb-2 font-semibold">
                              {" "}
                              {`Student ${index + 1} AIR`}{" "}
                              <input
                                required
                                type="number"
                                name={`air-${index}`}
                                value={student.air}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />{" "}
                            </label>{" "}
                            <label className="relative block mb-2 font-semibold">
                              {" "}
                              {`Student ${index + 1} Exam`}{" "}
                              <input
                                required
                                type="text"
                                name={`exam-${index}`}
                                value={student.exam}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />{" "}
                            </label>{" "}
                            <label className="relative block col-span-2 mb-2 font-semibold">
                              {" "}
                              {`Student ${index + 1} Description`}{" "}
                              <textarea
                                required
                                type="text"
                                name={`description-${index}`}
                                value={student.description}
                                onChange={(e) => handleStudentsChange(index, e)}
                                className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                              />{" "}
                            </label>{" "}
                          </div>{" "}
                          <div onClick={() => handleItemClickStudent(index)}>
                            {" "}
                            <StudentPhotoUploader
                              photos={students}
                              onChange={setStudents}
                              index={index}
                            />{" "}
                          </div>{" "}
                          <button
                            className="px-4 py-2 mt-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                            type="button"
                            onClick={() => handleRemoveStudent(index)}
                          >
                            {" "}
                            Remove Link{" "}
                          </button>{" "}
                        </div>
                      ))}{" "}
                      {studentsCount < 3 && students.Students.length < 3 && (
                        <button
                          className="px-4 py-2 mx-1 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                          type="button"
                          onClick={handleAddStudent}
                        >
                          {" "}
                          Add Student{" "}
                        </button>)}{" "}
                    </div>
                  ) : (
                    <></>
                  )}{" "}
                  <div className="border-[2px] border-black/20 p-4 rounded-md mt-5">
                    {" "}
                    {/* Faculty */}{" "}
                    <h2 className="my-4 text-xl font-bold">Faculty</h2>{" "}
                    {faculty.Faculties.map((faculty, index) => (
                      <div key={index} className="gap-4 mb-4 rounded-lg">
                        {" "}
                        <div className="grid grid-cols-2 gap-4">
                          {" "}
                          <label className="relative block mb-2 font-semibold">
                            {" "}
                            {`Faculty ${index + 1} Name`}{" "}
                            <input
                              required
                              type="text"
                              name={`name-${index}`}
                              value={faculty.name}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />{" "}
                          </label>{" "}
                          <label className="relative block mb-2 font-semibold">
                            {" "}
                            {`Faculty ${index + 1} Image`}{" "}
                            <input
                              required
                              type="text"
                              name={`facultyImg-${index}`}
                              value={faculty.facultyImg}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />{" "}
                          </label>{" "}
                          <label className="relative block mb-2 font-semibold">
                            {" "}
                            {`Faculty ${index + 1} College`}{" "}
                            <input
                              required
                              type="text"
                              name={`collegeName-${index}`}
                              value={faculty.collegeName}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />{" "}
                          </label>{" "}
                          <label className="relative block mb-2 font-semibold">
                            {" "}
                            {`Faculty ${index + 1} Classroom`}{" "}
                            <input
                              required
                              type="text"
                              name={`classroom-${index}`}
                              value={faculty.classroom}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />{" "}
                          </label>{" "}
                          <label className="relative block mb-2 font-semibold">
                            {`Faculty ${index + 1} Experience`}{" "}
                            <textarea
                              required
                              type="text"
                              name={`experience-${index}`}
                              value={faculty.experience}
                              onChange={(e) => handleFacultyChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />{" "}
                          </label>{" "}
                          <div>
                            {" "}
                            <FacultyPhotoUploader
                              photos={faculty}
                              onChange={setFaculty}
                              index={index}
                            />{" "}
                          </div>{" "}
                          <div className="mt-6">
                            {" "}
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
                    {facultyCount < 3 && faculty.Faculties.length < 3 && (
                      <button
                        className="px-4 py-2 mx-1 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                        type="button"
                        onClick={handleAddFaculty}
                      >
                        Add Link
                      </button>)}
                  </div>{" "}
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
                  </div>{" "}
                  <div className="border-[2px] border-black/20 p-4 rounded-md mt-5">
                    {/* Faculty */}
                    <h2 className="my-4 text-xl font-bold">Quick Links</h2>
                    {quickLinks.QuickLinks.map((faculty, index) => (
                      <div key={index} className="gap-4 mb-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <label className="relative block mb-2 font-semibold">
                            {`Series Start On ${index + 1} `}
                            <input
                              required
                              type="text"
                              name={`end-${index}`}
                              value={faculty.end}
                              onChange={(e) => handleQuickLinksChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {`Quick Links Image ${index + 1}`}
                            <input
                              required
                              type="text"
                              name={`image-${index}`}
                              value={faculty.image}
                              onChange={(e) => handleQuickLinksChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {`No. of Exams: ${index + 1} `}
                            <input
                              required
                              type="text"
                              name={`number-${index}`}
                              value={faculty.number}
                              onChange={(e) => handleQuickLinksChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {/* {`Price ${index + 1}`} */}
                            {`Child Product: ${index + 1}`}
                            <input
                              required
                              type="text"
                              name={`product-${index}`}
                              value={faculty.product}
                              onChange={(e) => handleQuickLinksChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <label className="relative block mb-2 font-semibold">
                            {`Series End On ${index + 1}`}
                            <textarea
                              required
                              type="text"
                              name={`start-${index}`}
                              value={faculty.start}
                              onChange={(e) => handleQuickLinksChange(index, e)}
                              className="w-full px-3 py-2 text-black bg-gray-100 border rounded-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                          </label>
                          <div>
                            <QuickLinksPhotoUploader
                              photos={quickLinks}
                              onChange={setquickLinks}
                              index={index}
                            />
                          </div>
                          <div className="mt-6">
                            <button
                              className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
                              type="button"
                              onClick={() => handleRemoveQuickLinks(index)}
                            >
                              Remove Link
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {quickLinksCount < 3 && quickLinks.QuickLinks.length < 3 && (
                      <button
                        className="px-4 py-2 mx-1 font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800"
                        type="button"
                        onClick={handleAddQuickLinks}
                      >
                        Add Link
                      </button>)}
                  </div>{" "}
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
