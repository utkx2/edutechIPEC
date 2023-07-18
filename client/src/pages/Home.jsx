
import Student from '../assets/student-img.png'
import AIR from '../assets/air.png'
import ClassroomImg1 from '../assets/classroom-1.jpg'
import ClassroomImg2 from '../assets/classroom-2.jpg'
import { Carousel } from "@material-tailwind/react";
import CarouselImg2 from '../assets/carousel-2.jpg'
import CarouselImg3 from '../assets/carousel-3.jpg'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className=''>

    <div className=''>
      <Carousel autoplay={true} loop={true} className="w-full bg-orange-200 rounded-xl">
        <img
        src={CarouselImg2}
          alt="image 2"
          className="object-cover w-screen h-[530px]"
        />
        <img
        src={CarouselImg3}
          alt="image 3"
          className="object-cover w-screen h-[530px]"
        />
      </Carousel>
    </div>

    <div className='my-10'>
      <h1 className=' text-3xl text-[#1f1d5a] font-bold text-center'>
        Ouick Links
      </h1> 

      <div className='flex items-center justify-center py-8'>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 max-w-[1244px]'>
            <div className='bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2'>
              Press & Media
              </div> 
              <div className='bg-[#1f1d5a]  text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2'>
              Download NAT Syllabus
              </div> 
              <div className='bg-[#1f1d5a] text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2'>
              Admission Test Result
              </div> 
              <div className='bg-[#1f1d5a]  text-center text-white hover:bg-white hover:border hover:border-[#1f1d5a] duration-200 linear rounded-[8px] hover:text-[#1f1d5a] font-bold px-8 py-2'>
              IPEC Assessment
              </div> 

            </div>
      </div>
      </div>
     

      {/* experience */}
      <div className='my-10 bg-[#d1e9f9] py-10'>
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center'>OUR TRAILBLAZERS SHARE THEIR EXPERIENCE</h1>
        <div className='flex items-center justify-center py-8'> 
          <div className='grid grid-cols-3 gap-8'>

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
        <div className='grid grid-cols-2 max-w-[1244px]'>

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
