import React from "react";
import MissionImg from '../assets/mission.png'

function OurMission() {
  return (
    <div className="flex items-center justify-center bg-[#d1e9f9]  ">
    <div className="flex flex-row items-center justify-center gap-10 p-10">
      <div className="w-[300px] h-[410px] mx-auto bg-white rounded-xl shadow-md overflow-hidden m-4">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <img className="object-cover w-full md:w-48" src="https://www.vidyamandir.com/assets/images/v1.jpg" alt="Founder 1" />
          </div>
          <div className="px-8 py-4">
            <p className="mt-1 text-sm leading-tight text-center text-[#1f1d5a] ">
              To help students EXCEED their potential while creating awakened
              citizens who will take the nation forward and make the world a
              better place
            </p>
          </div>
        </div>
      </div>
      <div className="m-4 mx-auto overflow-hidden ">
        <img className="h-[400px] w-full object-cover md:w-full" src={MissionImg} alt="Banner" />
      </div>
      <div className=" w-[300px] h-[410px]  mx-auto bg-white rounded-xl shadow-md overflow-hidden  m-4">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <img className="object-cover w-full md:w-48" src="https://www.vidyamandir.com/assets/images/m1.jpg" alt="Founder 2" />
          </div>
          <div className="px-8 py-4">
            <p className="mt-1 leading-tight text-center text-[#1f1d5a] text-sm">
              To become the first preference for all 
              students regarding their preparation
              for all competitive &amp; scholastic exams. As a{" "}
              <b className="font-bold">GURU</b>, to continuously foster intellectual curiosity,
              develop critical thinking, and enable the pursuit of excellence in
              all educational endeavors.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default OurMission;