import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import "../styles/Course.css";

function Course() {
  const [userData, setUserData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}Courses/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center py-10 bg-[#d1e9f9]">
      {Object.keys(userData).length !== 0 && (
        <div className="max-w-4xl w-full sm:w-3/4 md:w-1/2">
          {Object.values(userData).map((course, index) => {
            console.log(course);
            delete course.__v;
            delete course._id;
            return (
              <div
                key={index}
                className="flex flex-col mb-10 md:flex-row border-[1px] border-black/10 bg-white rounded-[16px] shadow-lg"
              >
                <div className="w-full">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="py-3 text-center text-white bg-[#1f1d5a] rounded-t-[16px] w-[800px]"
                          colSpan={2}>
                          {course.Title}
                        </th>
                      </tr>
                    </thead>
                    {/* added to give top margin between head and body */}
                    <div className="mt-5"></div>
                    <tbody className="">
                      {Object.entries(course).map((courseValArr, index) => (
                        <tr key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <td className="px-4 py-1 font-bold">{courseValArr[0]}</td>
                          <td className="col-span-2">{courseValArr[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center sm:justify-end mb-6 bg-white">
                    <Link to='/courseDetails'>
                      <button
                        className="bg-yellow-400 hover:bg-[#1f1d5a] hover:text-yellow-300 hover:font-bold mt-5 mx-4 py-2 px-4 rounded-[4px] border border-[#1f1d5a] cursor-pointer"
                      >
                        Registrations
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Course;
