import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";

function QuickLinkDetail() {
  const [formData, setFormData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(id, "id");
    fetch(`${BASE_URL}QuickLinkHomePage/get/${id}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      setFormData(data);
      // console.log(data);
    })
    .catch((error) => console.log(error));
  }, [id]);

  const registrationForm = () => {
    navigate('/registration')
  }
  
  return (
    <div>
      <div className="bg-[#d1e9f9] py-10">
        <div className="flex items-center justify-center w-screen">
          <div className="max-w-6xl p-8 mx-4 border shadow-xl md:mx-auto bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl my-10">
            <h1 className="mb-6 text-3xl font-bold text-[#1c1950]">
              Quick Link Details
            </h1>
            <img src={formData?.image} alt="" srcset="" />
            <hr className="mb-6 border-gray-400" />
            <div className="flex flex-col mb-6 md:flex-row">
              <h2
                className="flex-shrink-0 mb-4 md:mr-12 text-2xl font-bold border-r md:pr-14"
                style={{ color: "#1c1950" }}
              >
                Seesion End:
              </h2>
              <div
                className="flex-grow pl-6 font-mono text-xl text-gray-700"
                style={{ color: "#1c1950" }}
              >
                <i className="far fa-calendar"></i>
                
                <strong>{formData?.end} </strong>
              </div>
            </div>
            <div className="flex flex-col mb-6 md:flex-row">
              <h2
                className="flex-shrink-0 mb-4 md:mr-12 text-2xl font-bold border-r md:pr-14"
                style={{ color: "#1c1950" }}
              >
                Seesion Start: 
              </h2>
              <div className="flex-grow mb-4 ml-3">
              <strong>{formData?.start} </strong>
                {/* <ul className="pl-8 list-disc list-inside">
                  <li
                    className="mb-2 font-mono text-xl"
                    style={{ color: "#1c1950" }}
                  >
                    
                  </li>
                  <li
                    className="mb-2 font-mono text-lg"
                    style={{ color: "#1c1950" }}
                  >
                    {formData?.number}
                  </li>
                  <li className="mb-2 font-mono" style={{ color: "#1c1950" }}>
                    <strong>
                      Recordings Of Live Classes & Class Notes (PDF)
                    </strong>
                  </li>
                  <li className="mb-2 font-mono" style={{ color: "#1c1950" }}>
                    <strong>Live Quiz</strong>
                  </li>
                </ul> */}
              </div>
            </div>
            <div className="flex flex-col mb-6 md:flex-row">
              <h2
                className="flex-shrink-0 mb-4 md:mr-12 text-2xl font-bold border-r md:pr-14"
                style={{ color: "#1c1950" }}
              >
                Exam No.:
              </h2>
              <div className="flex-grow mb-4 ml-14 text-xl">
                <strong>{formData?.number} </strong>
              </div>
            </div>
            <div className="flex flex-col mb-6 md:flex-row">
              <h2
                className="flex-shrink-0 mb-4 md:mr-12 text-2xl font-bold border-r md:pr-14"
                style={{ color: "#1c1950" }}
              >
                Description:
              </h2>
              <div className="flex-grow mb-4 ml-16 text-xl">
              <strong>{formData?.product} </strong>
              </div>
            </div><div className="text-center">
            <button className="px-6 py-2 mt-5 font-bold text-white bg-yellow-400 rounded" onClick={registrationForm}>
                Register Now
              </button>
              </div>
          </div>
        </div>

        {/* <div className="mt-6">
          <div className="max-w-[60rem] p-8 mx-4 border shadow-xl md:mx-auto bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl my-10">
            <h1 className="mb-6 text-3xl font-bold">Payment Plans</h1>
            <hr className="mb-6 border-gray-400" />

            <div
              className="items-start p-8 w-full md:w-96 mx-auto shadow-2xl rounded-2xl bg-gradient-to-b from-gray-300 to-gray-50"
              style={{ color: "#fff", background: "#1f1e5a" }}
            >
              <div>
                <h1 className="mb-6 text-2xl font-bold ">Course Package</h1>
                <div className="flex justify-between mt-6">
                  <div>
                    <p className="text-sm">Actual Fee</p>
                    <div className="flex gap-4 items-center">
                      <div className="flex items-baseline gap-3">
                        <h2 className="text-xl font-bold line-through text-thin">
                          ₹ 10000
                        </h2>
                        <h2 className="text-xl font-bold text-thin">
                          ₹ 5000
                        </h2>
                        <p className="text-[10px]">Excluded GST*</p>
                      </div>
                      <div className="bg-[#17a2b8] p-1 rounded text-center text-[12px]">
                        Save
                        50%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="px-6 py-2 mt-5 font-bold text-white bg-yellow-400 rounded" onClick={registrationForm}>
                Register Now
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default QuickLinkDetail;