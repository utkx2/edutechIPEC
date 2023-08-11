import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import "../styles/Course.css";
import { useNavigate } from "react-router-dom";

function Course() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [id, setId] = useState("");
  const navigate = useNavigate();
  // let id;
  const showDetails = (userId) => {
    navigate(`/courseDetails/${userId}`);
    // console.log(userId);
  };

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
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="flex items-center justify-center py-10 bg-[#d1e9f9]">
      {Object.keys(userData).length !== 0 && (
        <div className="w-full max-w-3xl sm:w-3/4 ">
        <h1 className='text-3xl text-[#1f1d5a] font-bold text-center mb-5'>OUR COURSES</h1>
          {Object.values(userData).map((course, index) => {
            const modifiedCourseObj = Object.entries(course).filter(courseValArr => courseValArr[0] != "_id" && courseValArr[0] != "__v")
            return (
              <div
                key={index}
                className="flex flex-col mb-10 md:flex-row border-[1px] border-black/10 bg-white rounded-[16px] shadow-lg sm:mx-0 mx-8"
              >
                <div className="w-full">
                  <table className="table">
                    <thead>
                      <tr>
                        <th
                          className="py-3 text-center text-white bg-[#1f1d5a] rounded-t-[16px] w-[800px]"
                          colSpan={2}
                        >
                          {course.Title}
                        </th>
                      </tr>
                    </thead>
                    {/* added to give top margin between head and body */}
                    <div className="mt-5"></div>
                    <tbody className="">
                      {Object.entries(modifiedCourseObj).map((courseValArr, index) => (
                        <tr key={index} className="grid grid-cols-1 gap-0 px-4 my-3 sm:my-0 sm:gap-2 sm:px-0 sm:grid-cols-3">
                          <td className="px-0 py-0 font-bold sm:py-1 sm:px-4">{courseValArr[1][0]}</td>
                          <td className="sm:col-span-2">{courseValArr[1][1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center mb-6 bg-white sm:justify-end">
                    {/* <Link to={`/courseDetails/${course._id}`}> */}

                    <button
                      className="bg-yellow-400 hover:bg-[#1f1d5a] hover:text-yellow-300 hover:font-bold mt-5 mx-4 py-2 px-4 rounded-[4px] border border-[#1f1d5a] cursor-pointer"
                      onClick={() => {
                        showDetails(course._id);
                        // console.log("sa", course._id);
                      }}
                    >
                      Registration
                    </button>
                    {/* </Link> */}
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
