import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseDetails from "./CourseDetails";
import { BASE_URL } from "../config";
import "../styles/Course.css";

function Course() {
  const [userData, setUserData] = useState({})
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}Courses/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      setUserData(response.data)
      // setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex items-center justify-center  py-10 bg-[#d1e9f9]">
      {userData.length && (
        <div className="max-w-4xl">
        
      
      {userData.map((course, index) => {
        console.log(course)
        delete course.__v
        delete course._id
        return (
        <div key={index} className="flex flex-col mb-10 md:flex-row border-[1px] border-black/10 bg-white rounded-[16px] shadow-lg md:w-[800px]">
            <div className="w-full row">
              <div className="col-md-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="py-3 text-center text-white bg-[#1f1d5a] rounded-t-[16px] w-[800px]" colSpan={2}>
                        {course.Title}
                      </th>
                    </tr>
                  </thead>
                  {/* added to give top margin between head and body */}
                  <div className="mt-5"></div>
                  <tbody className="">
                    {Object.entries(course).map((courseValArr, index) => (
                      <tr key={index} className="grid grid-cols-3 gap-2">
                        <td className="col-span-1 px-4 py-1 font-bold">{courseValArr[0]}</td>
                        <td className="col-span-2">{courseValArr[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mb-6 bg-white">
                  <Link to='/courseDetails'>
                  <button className="bg-yellow-400 hover:bg-[#1f1d5a] hover:text-yellow-300 hover:font-bold mt-5 mx-4 py-2 px-4 rounded-[4px] border border-[#1f1d5a] cursor-pointer" onClick={() => <CourseDetails/>} >
                    Registrations
                  </button>
                  </Link>
                </div>
              </div>
            </div>
        </div>
      )})}
            
      </div>
      )}
    </div>
  );
}

export default Course;
