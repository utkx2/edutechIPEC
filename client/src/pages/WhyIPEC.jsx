import React from "react";

const WhyIPEC = () => {
  return (
    <div className="bg-[#d1e9f9] my-10">
      <div className="max-w-6xl px-4 py-5 mx-auto">
        <div className="">
          <div className="flex justify-center ">
            <h2 className="text-3xl font-bold mb-4 text-indigo-900 border-b-[6px] border-yellow-400">
              WHY IPEC ?
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-center ">
            Over the years, the name of Vidyamandir Classes (IPEC) has become
            synonymous with success in IITJEE, NEET &amp; FOUNDATION. Our goal at
            Vidyamandir Classes (IPEC) is to provide knowledge and guidance and
            thereby create an environment that not only guides students to the
            path of success but also inspires them to recognize and explore their
            own potential.{" "}
            <p className="mt-4 font-semibold">
              The fact that more than 1,00,000 students appear every year for the
              IPEC Test for the limited seats on offer is ample testimony to IPEC's
              popularity and credence within the IITJEE, NEET &amp; FOUNDATION
              aspirants' community.
            </p>{" "}
            All Courses are based on the time-tested teaching methodology, which
            has been perfected by IPEC and has produced unmatched results in IITJEE
            consistently over the past 35 years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-4 md:mx-20 mt-10">
          <div className="flex flex-col items-center mx-auto">
            <img
              src="https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%201.png"
              alt="Time Tested Learning Pedagogy"
              className="w-15 h-15 mb-2"
            />
            <p className="mt-2 text-center">Time Tested Learning Pedagogy</p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <img
              src="https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%203.png"
              alt="Learn from Best Teachers"
              className="w-15 h-15 mb-2"
            />
            <p className="mt-2 text-center">Learn from Best Teachers</p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <img
              src="https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%204.png"
              alt="Personal Mentorship"
              className="w-15 h-15 mb-2"
            />
            <p className="mt-2 text-center">Personal Mentorship</p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <img
              src="https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%202.png"
              alt="Highest Success Rate"
              className="w-15 h-15 mb-2"
            />
            <p className="mt-2 text-center">Highest Success Rate</p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <img
              src="https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%205.png"
              alt="Scientifically Designed Study Material"
              className="w-15 h-15 mb-2"
            />
            <p className="mt-2 text-center">
              Scientifically Designed Study Material
            </p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <img
              src="https://www.vidyamandir.com/assets/images/choose%20vmc%20icon%206.png"
              alt="Highly competitive peer group"
              className="w-15 h-15 mb-2"
            />
            <p className="mt-2 text-center">Highly competitive peer group</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyIPEC;