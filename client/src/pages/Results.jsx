import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import "../styles/Course.css";

function Result() {

  const [userData, setUserData] = useState({})
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}results/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data)
      setUserData(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
// resolution only takes 1200 by 384px
  function Banner(){
    return(
      <div>
      <h1 className="text-center text-2xl font-bold mx-auto py-8">
        Congratulation to our Fellow Students
        </h1>
      <div className="max-w-6xl mx-auto">
        <img className="w-full  max-h-96" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuakG3VrEnsgzzSaSmJRE2WSn2yKyfucc3sxuI1vQgqA&s" />
      </div>
      </div>
    )
  }

  return (
    <div className="bg-[#d1e9f9]">
      <Banner/>
    
    <section className="p-2" id="result">
      {userData.length && (
          <>
          {userData.map(resultObj => (
            <div className="container py-8 mx-auto">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold">{resultObj.examName}</h3>
              </div>

              <div className="flex justify-center max-w-6xl mx-auto overflow-x-auto text-start">
                <table className="w-full border-[2px] border-black/10">
                  <thead>
                    <tr className="w-full bg-gray-200">
                      <th className="px-4 py-2">Centre Name</th>
                      <th className="px-4 py-2">Student's Name</th>
                      <th className="px-4 py-2">VMC Roll No</th>
                      <th className="px-4 py-2">CRL RANK</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {resultObj.students.map(student => (
                      <tr key={student._id} className="w-full odd:bg-white even:bg-gray-100">
                        <td className="px-4 py-2">{student.centreName}</td>
                        <td className="px-4 py-2">{student.studentName}</td>
                        <td className="px-4 py-2">{student.IPECRollNo}</td>
                        <td className="px-4 py-2">{student.CRLRank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
        )}
    </section>
    </div>
  );
}

export default Result;
