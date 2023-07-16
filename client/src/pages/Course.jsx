import { useState } from "react";
import "../styles/Course.css";
import CourseDetails from "./CourseDetails";
import { Link } from "react-router-dom";

function Course() {
  const [table1Data] = useState([
    { column1: "Admission Mode", column2: "Entrance Test: IQPT, IEMT, ISAT" },
    { column1: "Course Code", column2: "Beginner" },
    { column1: "Commencement Date", column2: "1st Week of April." },
    { column1: "Phases", column2: "2 Phases 6 months each" },
    {
      column1: "Frequency of Classes / SDCC",
      column2:
        "Saturday, Sunday and School holidays 3 to 4 hours on each day. student are free to clarify their doubts from our faculties in the special doubt clearing classes which are conducted regularly.",
    },
  ]);

  const logTableValues = (tableData) => {
    const column2Values = tableData.map((row) => row.column2);
    console.log(column2Values);
  };


  return (
    <div className="flex items-center justify-center py-10 bg-[#d1e9f9]">
      <div className="max-w-5xl">
        
      
      <div className="flex flex-col mb-10 md:flex-row border-[1px] border-black/10 bg-white rounded-[16px] shadow-lg">
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th className="py-3 text-center text-white bg-[#1f1d5a] rounded-t-[16px]" colSpan={2}>
                      Olympaids: IOQJS, INAO, IAO, NSO, NSEJS
                    </th>
                  </tr>
                </thead>
                {/* added to give top margin between head and body */}
                <div className="mt-5"></div>
                <tbody className="">
                  {table1Data.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-1 mt-5 font-bold bg-white">{row.column1}</td>
                      <td>{row.column2}</td>
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

      <div className="flex flex-col mb-10 md:flex-row border-[1px] border-black/10 bg-white rounded-[16px] shadow-lg">
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th className="py-3 text-center text-white bg-[#1f1d5a] rounded-t-[16px]" colSpan={2}>
                      Olympaids: IOQJS, INAO, IAO, NSO, NSEJS
                    </th>
                  </tr>
                </thead>
                {/* added to give top margin between head and body */}
                <div className="mt-5"></div>
                <tbody className="">
                  {table1Data.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-1 mt-5 font-bold bg-white">{row.column1}</td>
                      <td>{row.column2}</td>
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

      <div className="flex flex-col mb-10 md:flex-row border-[1px] border-black/10 bg-white rounded-[16px] shadow-lg">
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th className="py-3 text-center text-white bg-[#1f1d5a] rounded-t-[16px]" colSpan={2}>
                      Olympaids: IOQJS, INAO, IAO, NSO, NSEJS
                    </th>
                  </tr>
                </thead>
                {/* added to give top margin between head and body */}
                <div className="mt-5"></div>
                <tbody className="">
                  {table1Data.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-1 mt-5 font-bold bg-white">{row.column1}</td>
                      <td>{row.column2}</td>
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

      

      

      
      </div>
    </div>
  );
}

export default Course;
