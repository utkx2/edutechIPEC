import React, { useEffect, useState } from "react";
import Student from "../assets/student-img.png";
import axios from "axios";
import AIR from '../assets/air.png'
import ClassroomImg1 from '../assets/classroom-1.jpg'
import ClassroomImg2 from '../assets/classroom-2.jpg'
// import { Carousel } from "@material-tailwind/react";
import CarouselImg2 from '../assets/carousel-2.jpg'
import CarouselImg3 from '../assets/carousel-3.jpg'
import FacultyImg from '../assets/faculty.png'
import { Link } from 'react-router-dom';
import { BASE_URL } from "../config";
import "../styles/Course.css";
import Carousel from '../components/carousel'
import StudentJourneyImg from '../assets/student-journey.png'

function Home() {
  const [userData, setUserData] = useState({});
  const [carousel, setCarousel] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [student, setStudent] = useState([]);
  // http://localhost:3000/api/facultyHomePage/get
  //  http://localhost:3000/api/ourPrograms/get/
  //  http://localhost:3000/api/carousel/get
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
      console.log(responseCarousel.data);
      setCarousel(responseCarousel.data);
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

      setStudent(responseStudent.data);
      setFaculty(responseFaculty.data);
      setPrograms(responsePrograms.data);
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
    console.log("Carousel:", carousel);
  }, [carousel]);

  useEffect(() => {
    console.log("Programs:", programs);
  }, [programs]);

  useEffect(() => {
    console.log("Faculty:", faculty);
  }, [faculty]);

  useEffect(() => {
    console.log("Student:", student);
  }, [student]);

  // console.log(carousel[0]?.images[0]);

  return (
    <div className=''>

      <div className=''>

        {carousel?.length > 0 && <Carousel carousel={carousel} />
        }
        {/* <Carousel autoplay={true} loop={true} className="w-full bg-orange-200 rounded-xl">
          <img
            src={CarouselImg2}
            alt="image 2"
            className="object-cover w-full h-[830px] md:h-[400px] sm:h-[300px] "
          />
          <img
            src={CarouselImg3}
            alt="image 3"
            className="object-cover w-full h-[830px] md:h-[400px] sm:h-[300px] "
          />
        </Carousel> */}
      </div>

      <div className="my-10">
        <h1 className=" text-3xl text-[#1f1d5a] font-bold text-center">
          Quick Links
        </h1>

        <div className="flex items-center justify-center py-8">
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
        </div>
      </div>
      

      {/* teachers */}
      <div className='mt-10 bg-[#d1e9f9] py-10'>
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>OUR EXPERIENCED FACULTY</h1>
        <div className='flex items-center justify-center py-8'>
          <div className='grid gap-8 md:grid-cols-3'>

            {/* student air card comp*/}
            <div className="w-[340px] bg-white border mt-5 shadow-lg rounded-[16px] p-3">

              <img src={FacultyImg} alt="student" className=' h-[280px] w-full rounded-[8px] ' />
              <div className='w-full text-[#1f1d5a] text-md h-fit mt-2 flex flex-col items-start justify-center text-center p-3'>
                <div className='text-lg font-bold'>Pradeep Malhotra</div>
                <div>2 Year classroom programme</div>
                <div>IIT Delhi</div>
                <div>Teaching from past 10+years.</div>
              </div>

            </div>

            {faculty.map((facultyData) => (
              <div
                key={facultyData._id}
                className="w-[340px] bg-white border mt-5 shadow-lg rounded-[16px] p-3"
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

      {/* <img src={StudentJourneyImg} alt="student_journey" className="w-full h-[730px] bg-cover" /> */}
      

      {/* experience */}
      <div className='mb-10 bg-[#d1e9f9] py-10'>
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>OUR TRAILBLAZERS EXPERIENCE</h1>
        <div className='flex items-center justify-center py-8'>
          <div className='grid gap-8 md:grid-cols-3'>

            {student.map(studentData => (
              <div className="relative w-[353px] h-auto rounded-[28px] bg-white border mt-10 shadow-xl" key={studentData._id}>

                <div className='m-2'>
                
                  <div className="flex items-center justify-between mx-3 mt-6">
                    <img src={studentData.studentImg} alt="student" className='h-[140px] w-[104px]' />
                    <div className="text-[#1f1d5a] m-3 text-sm flex flex-col items-end">
                      <div className="font-bold">
                        {studentData.studentDetails.name}
                      </div>
                      <div>{studentData.studentDetails.classRoomDetails}</div>
                      <div>{studentData.studentDetails.enrollmentNo}</div>
                      <div>Air {studentData.air}</div>
                    </div>
                  </div>
                  
                  <div className='relative bg-[#E9ECF5] rounded-[20px] mx-3 p-3 text-sm mb-14'>
                    {studentData.description}
                  </div>

                </div>
                <div className="absolute flex items-center justify-center h-[97px] w-[97px] bg-yellow-400 rounded-full right-[-5%] top-[-15%]">
                      <div className="flex flex-col items-center justify-center h-[80px] w-[80px] bg-[#1f1d5a] rounded-full right-0 top-0 text-white font-bold leading-[10px]">
                        <span className="text-[12px] ">AIR</span>
                        <span className="text-3xl">{studentData.air}</span>
                      </div>
                    </div>

                <div className='absolute w-full flex bottom-0 items-center text-white bg-[#1f1d5a] text-center font-bold justify-center rounded-b-[28px] h-[40px]'>
                  {studentData.exam}
                </div>

              </div>
            ))}



          </div>
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