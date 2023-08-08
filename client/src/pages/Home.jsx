import React, { useEffect, useState } from "react";
import Student from "../assets/student-img.png";
import axios from "axios";
import AIR from '../assets/air.png'
import ClassroomImg1 from '../assets/classroom-1.jpg'
import ClassroomImg2 from '../assets/classroom-2.jpg'
import { Carousel, CarouselItem, IconButton } from "@material-tailwind/react";
import CarouselImg2 from '../assets/carousel-2.jpg'
import CarouselImg3 from '../assets/carousel-3.jpg'
import FacultyImg from '../assets/faculty.png'
import { Link } from 'react-router-dom';
import { BASE_URL } from "../config";
import "../styles/Course.css";
//import Carousel from '../components/carousel'

function Home() {
  const [userData, setUserData] = useState({});
  const [carousel, setCarousel] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [quickLinks, setQuickLink] = useState([]);
  const [student, setStudent] = useState([]);
  // http:localhost:3000/api/facultyHomePage/get
  //  http:localhost:3000/api/ourPrograms/get/
  //  http:localhost:3000/api/carousel/get
  // http://localhost:3000/api/studentHomePage/get
  const fetchData = async () => {
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
      console.log(responseCarousel.data[0].images);
      setCarousel(responseCarousel.data[0].images);
      // console.log(carousel)
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
      // console.log(responsePrograms.data);
         console.log(responseStudent.data[0].Students);
      setStudent(responseStudent.data[0].Students);
      setFaculty(responseFaculty.data[0].facultyMembers);
      setQuickLink(responseQuickLink.data[0].quickLinks);
      setPrograms(responsePrograms.data[0].programs);
      //setUserData(response.data)
      // console.log(responseCarousel.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("Carousel:", carousel);
  }, [carousel]);

  useEffect(() => {
    // console.log("Programs:", programs);
  }, [programs]);

  useEffect(() => {
    // console.log("Faculty:", faculty);
  }, [faculty]);

  useEffect(() => {
    // console.log("Student:", student);
  }, [student]);

  // console.log(carousel[0]?.images[0]);
  // const CustomPrevArrow = () => (
  //   <button className="carousel__prev-arrow">
  //     <span className="material-icons">keyboard_arrow_left</span>
  //   </button>
  // );

  // const CustomNextArrow = () => (
  //   <button className="carousel__next-arrow">
  //     <span className="material-icons">keyboard_arrow_right</span>
  //   </button>
  // );
  // console.log(carousel)

  return (

    <div className=''>
      <div className=''>

        {/* {carousel?.length > 0 && carousel.map((links) => (
          <Carousel carousel={links} key={links._id} />
        ))
        } */}
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
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
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
         autoplay={true}  loop={true} className="w-full min-h-[330px] sm:[500px] md:h-[570px] ">
          {carousel.map((imageUrl, index) => (
              <img
                key={imageUrl}
                src={imageUrl}
                alt={`image ${index}`}
                className="w-full min-h-[330px] object-cover sm:[500px] md:h-[570px]"
              />
            )
          )}
          {/* <img
            src={carousel[0]}
            alt="image 2"
            className="object-cover w-full h-[830px] md:h-[400px] sm:h-[300px] "
          />
          <img
            src={carousel[1]}
            alt="image 3"
            className="object-cover w-full h-[830px] md:h-[400px] sm:h-[300px] "
          /> */}
        </Carousel>
      </div>

      <div className="my-10">
        <h1 className=" text-3xl text-[#1f1d5a] font-bold text-center">
          {/* Quick Links */}
        </h1>

        {/* <div className="flex items-center justify-center py-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 max-w-[1244px]">
            <Link to={'/media'} className="bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2">
              Press & Media
            </Link>
            <div className="bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2">
              Download NAT Syllabus
            </div>
            <div className="bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2">
              Admission Test Result
            </div>
            <div className="bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2">
              IPEC Assessment
            </div>
          </div>
        </div> */}
        <div className='mt-10 bg-[#d1e9f9] py-10'>
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>Quick Links</h1>
        <div className='flex items-center justify-center py-8 '>
          <div className='grid gap-8 md:grid-cols-3 '>

            {quickLinks.map((facultyData) => (
              <div
                key={facultyData._id}
                className="w-[340px] bg-white mt-5 shadow-lg rounded-[16px] p-3 border-4 border-[#1f1d5a]"
              >
                <img
                  src={facultyData.image}
                  alt="student"
                  className="h-[280px] w-full rounded-[8px]"
                />
                <div className="w-full text-[#1f1d5a] text-md h-fit mt-2 flex flex-col items-start justify-center text-center p-3">
                  <div className="text-lg font-bold">{facultyData.product}</div>
                  <div>{facultyData.start}</div>
                  <div>{facultyData.end}</div>
                  <div>{facultyData.number}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>


      {/* teachers */}
      <div className='mt-10 bg-[#d1e9f9] py-10'>
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>OUR EXPERIENCED FACULTY</h1>
        <div className='flex items-center justify-center py-8 '>
          <div className='grid gap-8 md:grid-cols-3 '>

            {faculty.map((facultyData) => (
              <div
                key={facultyData._id}
                className="w-[340px] bg-white mt-5 shadow-lg rounded-[16px] p-3 border-4 border-[#1f1d5a]"
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

      {/* experience */}
      <div className='mb-10 bg-[#d1e9f9] py-10'>
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>OUR TRAILBLAZERS EXPERIENCE</h1>
        <div className='flex items-center justify-center py-8'>
          {student?<div className='grid gap-8 md:grid-cols-3'>

            {student.map(studentData => (
              <div className="relative w-[353px] h-auto rounded-[16px] bg-white mt-10 shadow-xl " key={studentData._id}>
                <div className=''>
                  <div className="flex flex-col items-center justify-between mx-3 mt-3">
                    <img src={studentData.studentImg} alt="student" className='h-[280px] w-full rounded-[8px]' />
                    <div className="w-full text-[#1f1d5a] text-md h-fit mt-2 flex flex-col items-start justify-center text-center p-3">
                      <div className="font-bold">
                        {studentData.name}
                      </div>
                      <div>{studentData.classRoomDetails}</div>
                      <div>{studentData.enrollmentNo}</div>
                      <div>Air {studentData.air}</div>
                    </div>
                  </div>
                  <div className='relative bg-[#E9ECF5] rounded-[20px] mx-3 p-3 text-sm mb-14'>
                    {studentData.description}
                  </div>

                </div>
                <div className="absolute flex items-center justify-center h-[97px] w-[97px] bg-yellow-400 rounded-full right-[-10%] top-[-10%]">
                      <div className="flex flex-col items-center justify-center h-[80px] w-[80px] bg-[#1f1d5a] rounded-full right-0 top-0 text-white font-bold leading-[10px]">
                        <span className="text-[12px] ">AIR</span>
                        <span className="text-3xl">{studentData.air}</span>
                      </div>
                </div>
                <div className='absolute w-full flex bottom-0 items-center text-white bg-[#1f1d5a] text-center font-bold justify-center rounded-b-[16px] h-[40px]'>
                  {studentData.exam}
                </div>

              </div>
            ))}



          </div>:<></>}
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
                  src={ClassroomImg1}
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
            {/* </div> */}




          </div>
        </div>
      </div>

      {/* Home */}
    </div>

  );
}

export default Home;