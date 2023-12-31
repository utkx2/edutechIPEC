import React, { useEffect, useState } from "react";
import Student from "../assets/student-img.png";
import axios from "axios";
import AIR from "../assets/air.png";
import ClassroomImg1 from "../assets/classroom-1.jpg";
import ClassroomImg2 from "../assets/classroom-2.jpg";
import { Carousel, CarouselItem, IconButton } from "@material-tailwind/react";
import CarouselImg2 from "../assets/carousel-2.jpg";
import CarouselImg3 from "../assets/carousel-3.jpg";
import FacultyImg from "../assets/faculty.png";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import "../styles/Course.css";
function Home() {
  const [userData, setUserData] = useState({});
  const [carousel, setCarousel] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [quickLinks, setQuickLink] = useState([]);
  const [student, setStudent] = useState([]);
  const [popup, setPopup] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const fetchData = async () => {
    try {
      const responseCarousel = await axios.get(`${BASE_URL}carousel/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      setCarousel(responseCarousel.data[0].images);
      const responsePopUp = await axios.get(`${BASE_URL}PopUp/getImage`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      setPopup(responsePopUp.data[0]);
      // console.log(popup, "popup");
      const responsePrograms = await axios.get(`${BASE_URL}ourPrograms/get/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
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
      const responseQuickLink = await axios.get(
        `${BASE_URL}QuickLinkHomePage/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
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
      setStudent(responseStudent.data[0].Students);
      setFaculty(responseFaculty.data[0].facultyMembers);
      setQuickLink(responseQuickLink.data[0].quickLinks);
      setPrograms(responsePrograms.data[0].programs);
      // console.log(programs);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const viewDetails = (userId) => {
    navigate(`quickLinkdetail/${userId}`);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".modal-content")) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ">
          <div className="relative w-full max-w-[90%] max-h-[80%] sm:max-w-[70%] sm:max-h-[70%]">
            <a
              href={popup.redirectURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={popup.image}
                alt="Modal Content"
                className="w-full h-full cursor-pointer"
              />
            </a>

            {/* Cancel Button */}
            <IconButton
              color="gray"
              style={{background: "black"}}
              size="lg"
              onClick={closeModal}
              className="absolute top-3 right-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
        </div>
      )}
      <div className=" relative z-0">
        <Carousel
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4 bg-white/30 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                // strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-white/30 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute z-50 flex gap-2 bottom-4 left-2/4 -translate-x-2/4">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          autoplay={true}
          loop={true}
          className="w-full object-cover h-full"
        >
          {carousel.map((imageUrl, index) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={`image ${index}`}
              className="w-full object-cover h-full"
            />
          ))}
        </Carousel>
      </div>

      <div className="my-10">
        <h1 className=" text-3xl text-[#1f1d5a] font-bold text-center">
          {/* Quick Links */}
        </h1>
        <div className="mt-10 py-10">
          <h1 className="text-3xl text-[#1f1d5a] font-bold text-center">
            Quick Links
          </h1>
          <div className="flex items-center justify-center py-8 ">
            <div className="grid gap-8 md:grid-cols-3 ">
              {quickLinks.map((facultyData) => (
                <div
                  key={facultyData._id}
                  className="w-[340px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-5 rounded-[16px] p-3border-[#1f1d5a]"
                >
                  <img
                    src={facultyData.image}
                    alt="student"
                    className="h-[280px] w-full rounded-[8px]"
                  />
                  <div className="w-full text-[#1f1d5a] text-md h-fit mt-2 flex flex-col items-start justify-center text-center p-3">
                    <div className="font-semibold text-base">
                      {facultyData.number.slice(0, 20)}
                    </div>
                    <div>{facultyData.start.slice(0, 20)}</div>
                    <div>{facultyData.end.slice(0, 20)}</div>
                    <div>{facultyData.product.slice(0, 20)}</div>
                  </div>
                  <div className="text-center">
                    <button
                      className="bg-blue-400 ml-2 mb-4 text-white p-2 font-medium transform hover:rotate-360 transition-transform duration-5000 ease-in-out"
                      onClick={() => {
                        viewDetails(facultyData._id);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10  py-10">
        <h1 className="text-3xl text-[#1f1d5a] font-bold text-center">
          OUR EXPERIENCED FACULTY
        </h1>
        <div className="flex items-center justify-center py-8 ">
          <div className="grid gap-8 md:grid-cols-3 ">
            {faculty.map((facultyData) => (
              <div
                key={facultyData._id}
                className="w-[340px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white mt-5  rounded-[16px] p-3 border-[#1f1d5a]"
              >
                <img
                  src={facultyData.facultyImg}
                  alt="student"
                  className="h-[280px] w-full rounded-[8px]"
                />
                <div className="w-full text-[#1f1d5a] text-md h-fit mt-2 flex flex-col items-start justify-center text-center p-3">
                  <div className="text-lg font-bold">{facultyData.name}</div>
                  <div>{facultyData.classroom}</div>
                  <div>{facultyData.collegeName}</div>
                  <div>{facultyData.experience}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-10  py-10">
        <h1 className="text-3xl text-[#1f1d5a]  font-bold text-center">
          OUR TRAILBLAZERS EXPERIENCE
        </h1>
        <div className="flex items-center justify-center py-8">
          {student ? (
            <div className="grid gap-8 ">
              {student.map((studentData) => (
                <div
                  className="relative sm:w-full md:w-[900px] h-auto rounded-[16px]  bg-white mt-10 "
                  key={studentData._id}
                >
                  <div className="">
                    <div className="flex flex-col items-center justify-between mx-3 mt-3">
                      <img
                        src={studentData.studentImg}
                        alt="student"
                        className="h-[650px] w-full rounded-[8px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <h1 className=" text-3xl text-[#1f1d5a] font-bold text-center">
          OUR PROGRAMS
        </h1>
        <div className="flex items-center justify-center py-8">
          <div className="grid md:grid-cols-2 max-w-[1244px]">
            {/* <div className="flex flex-col items-center gap-4 p-2"> */}
            {programs.map((programData) => (
              <div
                key={programData._id}
                className="flex flex-col items-center gap-4 p-2"
              >
                <img
                  src={programData.image}
                  alt={programData.title}
                  className="h-[310px] w-[527px]"
                />
                <h1 className="text-2xl">{programData.title}</h1>
                <p className="w-5/6 text-center ">{programData.description}</p>
                <Link
                  to="/course"
                  className="text-[#1f1d5a] w-fir text-center hover:bg-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-yellow-400 hover:underline font-bold bg-yellow-400 px-8 py-2 "
                >
                  Discover Program
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
