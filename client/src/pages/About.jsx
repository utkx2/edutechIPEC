import { useState, useEffect } from "react";
import axios from "axios";
function About() {
  const [userData, setUserData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/AboutIpec/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      console.log(response)
      if (response.status == 200) {
        console.log('successfully get all registrations')
      }
      if (response.status == 500) {
        console.log('failed get all registrations')
      }
      setUserData(response.data);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('useEffect')
    fetchData();
  }, []);

  return (
    <div className="bg-[#d1e9f9]">


      <div className="max-w-6xl px-4 py-10 mx-auto ">
        <div className="">
          <div className="flex justify-center ">
            <h2 className="text-3xl font-bold mb-4 900 border-b-[6px] border-yellow-400">
              ABOUT IPEC
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-center ">
            {userData.AboutIPEC}
            {" "}

          </p>
        </div>

        {/* */}

        <div className="py-10 text-center">
          <div className="container px-4 mx-auto">
            <div className="flex justify-center ">
              <h2 className="text-3xl font-bold mb-4 900 border-b-[6px] border-yellow-400">
                ABOUT IPEC
              </h2>
            </div>
            <p className="text-[16px] leading-relaxed text-center ">
              {userData.AboutIPEC}
            </p>
            <div className="flex flex-wrap mt-8 -mx-2">
              <div className="w-full px-2 mb-4 sm:w-1/2 md:w-1/4 ">
                <div className="bg-white rounded-lg shadow-lg p-6 h-[440px]">
                  <div className="text-center">
                    <span>
                      <img
                        src="https://www.vidyamandir.com/assets/images/33.png"
                        alt="Detailed Theory Portions"
                      />
                    </span>
                    <h3 className="mt-4 mb-2 text-xl font-semibold">
                      Detailed Theory Portions
                    </h3>
                  </div>
                  <p className="leading-relaxed text-gray-700">
                    {userData.ipecAdvantages}
                  </p>
                </div>
              </div>
              <div className="w-full px-2 mb-4 sm:w-1/2 md:w-1/4 ">
                <div className="bg-white rounded-lg shadow-lg p-6 h-[440px]">
                  <div className="text-center">
                    <span>
                      <img
                        src="https://www.vidyamandir.com/assets/images/34.png"
                        alt="Solved Examples &amp; In-Chapter Exercises"
                      />
                    </span>
                    <h3 className="mt-4 mb-2 text-xl font-semibold">
                      Solved Examples &amp; In-Chapter Exercises
                    </h3>
                  </div>
                  <p className="leading-relaxed text-gray-700">
                    {userData.ipecAdvantages}
                  </p>
                </div>
              </div>
              <div className="w-full px-2 mb-4 sm:w-1/2 md:w-1/4 ">
                <div className="bg-white rounded-lg shadow-lg p-6 h-[440px]">
                  <div className="text-center">
                    <span>
                      <img
                        src="https://www.vidyamandir.com/assets/images/35.png"
                        alt="Objective Worksheets"
                      />
                    </span>
                    <h3 className="mt-4 mb-2 text-xl font-semibold">
                      Objective Worksheets
                    </h3>
                  </div>
                  <p className="leading-relaxed text-gray-700">
                    {userData.ipecAdvantages}
                  </p>
                </div>
              </div>
              <div className="w-full px-2 mb-4 sm:w-1/2 md:w-1/4 ">
                <div className="bg-white rounded-lg shadow-lg p-6 h-[440px]">
                  <div className="text-center">
                    <span>
                      <img
                        src="https://www.vidyamandir.com/assets/images/36.png"
                        alt="Extensive Testing &amp; Evaluation"
                      />
                    </span>
                    <h3 className="mt-4 mb-2 text-xl font-semibold">
                      Extensive Testing &amp; Evaluation
                    </h3>
                  </div>
                  <p className="leading-relaxed text-gray-700">
                    {userData.ipecAdvantages}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* */}

          <div className="py-10 text-center">
            <div className="container px-4 mx-auto">
              <div className="flex justify-center ">
                <h2 className="text-3xl font-bold mb-4 border-b-[6px] border-yellow-400">
                  IPEC ADVANTAGE
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                  <img
                    src="https://www.vidyamandir.com/assets/images/ped1.png"
                    alt="Detailed Theory Portions"
                    className="w-24 mx-auto mb-4"
                  />
                  <h3 className="mb-2 text-xl font-semibold">
                    Concept Lectures &amp; Study Material
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    {userData.ipecPedagogy}
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                  <img
                    src="https://www.vidyamandir.com/assets/images/ped2.png"
                    alt="Solved Examples &amp; In-Chapter Exercises"
                    className="w-24 mx-auto mb-4"
                  />
                  <h3 className="mb-2 text-xl font-semibold">
                    Live Classes &amp; Doubt Clearing
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    {userData.ipecPedagogy}
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                  <img
                    src="https://www.vidyamandir.com/assets/images/ped3.png"
                    alt="Objective Worksheets"
                    className="w-24 mx-auto mb-4"
                  />
                  <h3 className="mb-2 text-xl font-semibold">Online Tests</h3>
                  <p className="leading-relaxed text-gray-700">
                    {userData.ipecPedagogy}
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                  <img
                    src="https://www.vidyamandir.com/assets/images/ped4.png"
                    alt="Extensive Testing &amp; Evaluation"
                    className="w-24 mx-auto mb-4"
                  />
                  <h3 className="mb-2 text-xl font-semibold">
                    Performance Dashboard
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    {userData.ipecPedagogy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>
    // </div>
  );
}

export default About;
