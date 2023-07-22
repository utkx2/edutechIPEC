import React, { useEffect, useState } from "react";
import Student from '../assets/student-img.png'
import axios from "axios";
import AIR from '../assets/air.png'
import ClassroomImg1 from '../assets/classroom-1.jpg'
import ClassroomImg2 from '../assets/classroom-2.jpg'
import { Carousel } from "@material-tailwind/react";
import CarouselImg2 from '../assets/carousel-2.jpg'
import CarouselImg3 from '../assets/carousel-3.jpg'
import FacultyImg from '../assets/faculty.png'
import { Link } from 'react-router-dom';
import { BASE_URL } from "../config";
import "../styles/Course.css";


function Home() {


  const [userData, setUserData] = useState({})
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
        `${BASE_URL}/api/carousel/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      // console.log(responseCarousel.data);
      setCarousel(responseCarousel.data);
      // console.log(carousel)
      const responsePrograms = await axios.get(
        `${BASE_URL}/api/ourPrograms/get/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      const responseFaculty = await axios.get(
        `${BASE_URL}/api/facultyHomePage/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      const responseStudent = await axios.get(
        `${BASE_URL}/api/studentHomePage/get`,
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
    console.log('Carousel:', carousel);
  }, [carousel]);

  useEffect(() => {
    console.log('Programs:', programs);
  }, [programs]);

  useEffect(() => {
    console.log('Faculty:', faculty);
  }, [faculty]);

  useEffect(() => {
    console.log('Student:', student);
  }, [student]);

  console.log(carousel[0]?.images[0]);

  return (
    <div className=''>

      <div className=''>
        <Carousel autoplay={true} loop={true} className="w-full bg-orange-200 rounded-xl">
          <img
            src={CarouselImg2}
            alt="image 2"
            className="object-cover w-full h-[530px] md:h-[400px] sm:h-[300px] "
          />
          <img
            src={CarouselImg3}
            alt="image 3"
            className="object-cover w-full h-[530px] md:h-[400px] sm:h-[300px] "
          />
        </Carousel>
      </div>

      <div className='my-10'>
        <h1 className=' text-3xl text-[#1f1d5a] font-bold text-center'>
          Quick Links
        </h1>

        <div className='flex items-center justify-center py-8'>
          <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 max-w-[1244px]'>
            <div className='bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2'>
              Press & Media
            </div>
            <div className='bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2'>
              Download NAT Syllabus
            </div>
            <div className='bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2'>
              Admission Test Result
            </div>
            <div className='bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2'>
              IPEC Assessment
            </div>

          </div>
        </div>
      </div>


      {/* teachers */}
      <div className='my-10 bg-[#d1e9f9] py-10'>
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>OUR EXPERIENCED FACULTY</h1>
        <div className='flex items-center justify-center py-8'>
          <div className='grid md:grid-cols-3 gap-8'>

            {/* student air card comp*/}
            <div className="w-[340px] bg-white border mt-5 shadow-lg rounded-[16px] p-3">

              <img src={FacultyImg} alt="student" className=' h-[280px] w-full rounded-[8px] ' />
              <div className='w-full text-[#1f1d5a] text-md h-fit mt-2 flex flex-col items-start justify-center text-center p-3'>
                <div className='font-bold text-lg'>Pradeep Malhotra</div>
                <div>2 Year classroom programme</div>
                <div>IIT Delhi</div>
                <div>Teaching from past 10+years.</div>
              </div>

            </div>

            <div className="w-[340px] bg-white border mt-5 shadow-lg rounded-[16px] p-3">

              <img src={FacultyImg} alt="student" className=' h-[280px] w-full rounded-[8px] ' />
              <div className='w-full text-[#1f1d5a] text-md h-fit mt-2 flex flex-col items-start justify-center text-center justify-center p-3'>
                <div className='text-lg font-bold'>Pradeep Malhotra</div>
                <div>2 Year classroom programme</div>
                <div>IIT Delhi</div>
                <div>Teaching from past 10+years.</div>
              </div>

            </div>

            <div className="w-[340px] bg-white border mt-5 shadow-lg rounded-[16px] p-3">

              <img src={FacultyImg} alt="student" className=' h-[280px] w-full rounded-[8px] ' />
              <div className='w-full text-[#1f1d5a] text-md h-fit mt-2 flex flex-col items-start justify-center text-center justify-center p-3'>
                <div className='text-lg font-bold'>Pradeep Malhotra</div>
                <div>2 Year classroom programme</div>
                <div>IIT Delhi</div>
                <div>Teaching from past 10+years.</div>
              </div>

            </div>

          </div>
        </div>
      </div>


      {/* experience */}
      <div className='my-10 bg-[#d1e9f9] py-10'>
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>OUR EXPERIENCED FACULTY</h1>
        <div className='flex items-center justify-center py-8'>
          <div className='grid md:grid-cols-3 gap-8'>

            {/* student air card comp*/}
            <div className="relative w-[353px] rounded-[28px] bg-white border mt-5 shadow-lg">

              <div className='m-2'>
                <div className='relative bg-[#E9ECF5] rounded-[20px] m-3 p-3 text-sm'>
                  "Everything at VMC is designed to give JEE aspirants
                  an edge. Be it the faculty, the study material, stress free learning
                  environment & value-based pedagogy  everything is designed to
                  power you to deliver peak performance in JEE. "
                  <img src={AIR} alt="air" className='absolute h-[97px] w-[97px] right-10 top-[85%]' />
                </div>

                <img src={Student} alt="student" className='absolute h-[140px] w-[104px] bottom-10 left-5' />

                <div className='text-[#1f1d5a] m-3 text-sm flex flex-col justify-end items-end mt-20 mb-16'>
                  <div className='font-bold'>Paarth Agarwal</div>
                  <div>2 Year classroom programme</div>
                  <div>enrollment number</div>
                  <div>1900910130086</div>
                </div>

              </div>

              <div className='absolute w-full flex bottom-0 items-center bg-yellow-400 text-center font-bold justify-center rounded-b-[28px] h-[40px]'>
                JEE ADVANCED 2022
              </div>

            </div>

            <div className="relative w-[353px] rounded-[28px] bg-white border mt-5 shadow-xl">

              <div className='m-2'>
                <div className='relative bg-[#E9ECF5] rounded-[20px] m-3 p-3 text-sm'>
                  "Everything at VMC is designed to give JEE aspirants
                  an edge. Be it the faculty, the study material, stress free learning
                  environment & value-based pedagogy  everything is designed to
                  power you to deliver peak performance in JEE. "
                  <img src={AIR} alt="air" className='absolute h-[97px] w-[97px] right-10 top-[85%]' />
                </div>

                <img src={Student} alt="student" className='absolute h-[140px] w-[104px] bottom-10 left-5' />

                <div className='text-[#1f1d5a] m-3 text-sm flex flex-col justify-end items-end mt-20 mb-16'>
                  <div className='font-bold'>Paarth Agarwal</div>
                  <div>2 Year classroom programme</div>
                  <div>enrollment number</div>
                  <div>1900910130086</div>
                </div>

              </div>

              <div className='absolute w-full flex bottom-0 items-center bg-yellow-400 text-center font-bold justify-center rounded-b-[28px] h-[40px]'>
                JEE ADVANCED 2022
              </div>

            </div>

            <div className="relative w-[353px] rounded-[28px] bg-white border mt-5 shadow-xl">

              <div className='m-2'>
                <div className='relative bg-[#E9ECF5] rounded-[20px] m-3 p-3 text-sm'>
                  "Everything at VMC is designed to give JEE aspirants
                  an edge. Be it the faculty, the study material, stress free learning
                  environment & value-based pedagogy  everything is designed to
                  power you to deliver peak performance in JEE. "
                  <img src={AIR} alt="air" className='absolute h-[97px] w-[97px] right-10 top-[85%]' />
                </div>

                <img src={Student} alt="student" className='absolute h-[140px] w-[104px] bottom-10 left-5' />

                <div className='text-[#1f1d5a] m-3 text-sm flex flex-col justify-end items-end mt-20 mb-16'>
                  <div className='font-bold'>Paarth Agarwal</div>
                  <div>2 Year classroom programme</div>
                  <div>enrollment number</div>
                  <div>1900910130086</div>
                </div>

              </div>

              <div className='absolute w-full flex bottom-0 items-center bg-yellow-400 text-center font-bold justify-center rounded-b-[28px] h-[40px]'>
                JEE ADVANCED 2022
              </div>

            </div>

          </div>
        </div>
      </div>

      <div>
        <h1 className=' text-3xl text-[#1f1d5a] font-bold text-center'>
          OUR PROGRAMS
        </h1>

        <div className='flex items-center justify-center py-8'>
          <div className='grid md:grid-cols-2 max-w-[1244px]'>

            <div className='flex flex-col items-center gap-4 p-2'>
              <img src={ClassroomImg1} alt='classroom_1' className='h-[310px] w-[527px]' />
              <h1 className='text-2xl'>IPEC Classroom Programs</h1>
              <p className='w-5/6 text-center'>
                Learn from best teachers in India remotely, attend Live classes and engage.
                Now you can truly learn from anywhere, anytime.
                We have enabled best technologies to give you a great learning platform.
              </p>
              <Link to='/course' className='text-[#1f1d5a] w-fir text-center hover:bg-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-yellow-400 hover:underline font-bold bg-yellow-400 px-8 py-2'>
                Discover Program
              </Link>
            </div>

            <div className='flex flex-col items-center gap-4 p-2'>
              <img src={ClassroomImg2} alt='classroom_1' className='h-[310px] w-[527px]' />
              <h1 className='text-2xl'>IPEC Online Program</h1>
              <p className='w-5/6 text-center'>
                Learn from best teachers in India remotely, attend Live classes and engage.
                Now you can truly learn from anywhere, anytime.
                We have enabled best technologies to give you a great learning platform.
              </p>
              <Link to='/course' className='text-[#1f1d5a] w-fir text-center hover:bg-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-yellow-400 hover:underline font-bold bg-yellow-400 px-8 py-2'>
                Discover Program
              </Link>
            </div>


            <div className='flex flex-col items-center gap-4 p-2'>
              <img src={ClassroomImg1} alt='classroom_1' className='h-[310px] w-[527px]' />
              <h1 className='text-2xl'>IPEC Distance Learning Program</h1>
              <p className='w-5/6 text-center'>
                Learn from best teachers in India remotely, attend Live classes and engage.
                Now you can truly learn from anywhere, anytime.
                We have enabled best technologies to give you a great learning platform.
              </p>
              <Link to='/course' className='text-[#1f1d5a] w-fir text-center hover:bg-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-yellow-400 hover:underline font-bold bg-yellow-400 px-8 py-2'>
                Discover Program
              </Link>
            </div>

            <div className='flex flex-col items-center gap-4 p-2'>
              <img src={ClassroomImg2} alt='classroom_1' className='h-[310px] w-[527px]' />
              <h1 className='text-2xl'>IPEC Medical Division</h1>
              <p className='w-5/6 text-center'>
                Learn from best teachers in India remotely, attend Live classes and engage.
                Now you can truly learn from anywhere, anytime.
                We have enabled best technologies to give you a great learning platform.
              </p>
              <Link to='/course' className='text-[#1f1d5a] w-fir text-center hover:bg-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-yellow-400 hover:underline font-bold bg-yellow-400 px-8 py-2'>
                Discover Program
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Home */}


    </div>
  );
}

export default Home;
