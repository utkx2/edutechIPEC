import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config";

function CourseDetails() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  console.log(id)

  useEffect(() => {
    console.log(id)
    // http://localhost:3000/api/Courses/get/:id
    fetch(`${BASE_URL}Courses/get/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setFormData(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));

  }, [id]);

  const calculateDiscountedPrice = (price, dis) => {
    const discount = parseFloat(dis);
    if (!isNaN(price) && !isNaN(discount)) {
        const discountedPrice = price - (price * discount) / 100;
        return discountedPrice.toFixed(2);
    }
    return '';
};

  return (
    <div className="bg-[#d1e9f9] py-10">
      <div className="flex items-center justify-center w-screen">
        <div className="max-w-6xl p-8 mx-4 border shadow-xl md:mx-auto bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl my-10">
          <h1 className="mb-6 text-3xl font-bold text-[#1c1950]">Course Details</h1>
          <hr className="mb-6 border-gray-400" />
          <div className="flex flex-col mb-6 md:flex-row">
            <h2 className="flex-shrink-0 mb-4 md:mr-12 text-2xl font-bold border-r md:pr-14" style={{ color: "#1c1950" }}>
              Class Schedule
            </h2>
            <div className="flex-grow pl-6 font-mono text-xl text-gray-700" style={{ color: "#1c1950" }}>
              <i className="far fa-calendar"></i> <strong>{formData?.ClassSchedule} </strong>
            </div>
          </div>
          <div className="flex flex-col mb-6 md:flex-row">
            <h2 className="flex-shrink-0 mb-4 md:mr-12 text-2xl font-bold border-r md:pr-14" style={{ color: "#1c1950" }}>
              Study Content
            </h2>
            <div className="flex-grow mb-4">
              <ul className="pl-8 list-disc list-inside">
                <li className="mb-2 font-mono text-xl" style={{ color: "#1c1950" }}><strong>Comprehensive Study Material</strong></li>
                <li className="mb-2 font-mono text-lg" style={{ color: "#1c1950" }}>
                  {formData?.StudyContent}
                </li>
                <li className="mb-2 font-mono" style={{ color: "#1c1950" }}><strong>Recordings Of Live Classes & Class Notes (PDF)</strong></li>
                <li className="mb-2 font-mono" style={{ color: "#1c1950" }}><strong>Live Quiz</strong></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col mb-6 md:flex-row">
            <h2 className="flex-shrink-0 mb-4 md:mr-12 text-2xl font-bold border-r md:pr-14" style={{ color: "#1c1950" }}>
              Comprehensive <br /> Practise & <br /> Assessment
            </h2>
            <div className="flex-grow mb-4 text-xl">
              <ul className="pl-4 list-disc list-inside">
                <li className="mb-2 font-mono" style={{ color: "#1c1950" }}>Non Academic Mentors</li>
                <li className="mb-2 font-mono" style={{ color: "#1c1950" }}>Recorded School Support Classes</li>
                <li className="mb-2 font-mono" style={{ color: "#1c1950" }}>
                  {formData?.ComprehensivePractice}
                </li>
                <li className="mb-2 font-mono" style={{ color: "#1c1950" }}>Chat Based Interaction In The Class</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-6">
          <div
            className="max-w-[60rem] p-8 mx-4 border shadow-xl md:mx-auto bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl my-10">

            <h1 className="mb-6 text-3xl font-bold">Payment Plans</h1>
            <hr className="mb-6 border-gray-400" />

            <div
              className="items-start p-8 w-full md:w-96 mx-auto shadow-2xl rounded-2xl bg-gradient-to-b from-gray-300 to-gray-50"
              style={{ color: "#fff", background: "#1f1e5a" }}
            >
              <div>
                <h1 className="mb-6 text-2xl font-bold ">
                  Course Package
                </h1>
                <div className="flex justify-between mt-6">
                  <div>
                    <p className="text-sm">Actual Fee</p>
                    <div className="flex gap-4 items-center">
                      <div className="flex items-baseline gap-3">
                        <h2 className="text-xl font-bold line-through text-thin">₹{formData?.price}</h2>
                        <h2 className="text-xl font-bold text-thin">₹{calculateDiscountedPrice(formData?.price,formData?.discount )}</h2>
                        <p className="text-[10px]">Excluded GST*</p>
                      </div>
                      <div className="bg-[#17a2b8] p-1 rounded text-center text-[12px]">
                        Save {formData?.discount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="px-6 py-2 mt-5 font-bold text-white bg-yellow-400 rounded" >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
