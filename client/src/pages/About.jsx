import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

function About() {
  const [userData, setUserData] = useState({})
  // api/whyIPEC/get
  const [imageUrl, setImageUrl] = useState('');


  const handleGetImage = async () => {
    try {
      // Fetch image data from the server
      const response = await fetch(`${BASE_URL}image/64c49d3ca552407bfd454ad3`); // Replace "your-image-id" with the actual ID of the image you want to fetch

      if (response.ok) {
        const data = await response.json();
        setImageUrl(`data:image/png;base64,${data.base64Data}`);
      } else {
        alert('Failed to fetch image data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  const handleUpload = async () => {
    try {
      // Request image from clipboard (as base64)
      const clipboardImage = await navigator.clipboard.read();
      const imageBlob = clipboardImage[0].types.includes('image/png')
        ? await clipboardImage[0].getType('image/png')
        : await clipboardImage[0].getType('image/jpeg');
      // Convert Blob to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];

        // Send the base64 image data to the server
        const response = await fetch(`${BASE_URL}upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image }),
        });

        if (response.ok) {
          alert('Image uploaded successfully');
        } else {
          alert('Image upload failed');
        }
      };
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}aboutipec/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data[0])
      setUserData(response.data[0])
      // setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const advantageImgArr = [
    "https://www.vidyamandir.com/assets/images/33.png",
    "https://www.vidyamandir.com/assets/images/34.png",
    "https://www.vidyamandir.com/assets/images/35.png",
    "https://www.vidyamandir.com/assets/images/36.png"
  ]

  const pedagogyImgArr = [
    "https://www.vidyamandir.com/assets/images/ped1.png",
    "https://www.vidyamandir.com/assets/images/ped2.png",
    "https://www.vidyamandir.com/assets/images/ped3.png",
    "https://www.vidyamandir.com/assets/images/ped4.png"
  ]

  return (
    <div className="bg-[#d1e9f9]">
      {userData.AboutIPEC && (
        <div className="max-w-6xl px-4 py-10 mx-auto ">
          <div className="">
            <div className="flex justify-center ">
              <h2 className="text-3xl font-bold mb-4 900 border-b-[6px] border-yellow-400">
                ABOUT IPEC
              </h2>
            </div>
            <p className="text-[16px] leading-relaxed text-center ">
              {userData.AboutIPEC}
            </p>
          </div>

          {/* */}


          <div className="py-10 text-center">
            <div className="container px-4 mx-auto">
              <div className="flex justify-center ">
                <h2 className="text-3xl font-bold mb-4 border-b-[6px] border-yellow-400">
                  IPEC ADVANTAGE
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-700">
                Studying at IPEC has its own set of advantages. Students are in a
                better position to clear the competitive exams and be more. We help
                students realize their fullest potential.
              </p>
              <div className="flex flex-wrap mt-8 -mx-2">
                {userData.ipecAdvantages.map((advantage, index) => (
                  <div key={index} className="w-full px-2 mb-4 sm:w-1/2 md:w-1/4 ">
                    <div className="flex items-center flex-col bg-white rounded-lg shadow-lg p-6 h-[440px]">
                      <img
                        src={advantageImgArr[index]}
                        alt="Detailed Theory Portions"
                      />
                      <h3 className="mt-4 mb-2 text-xl font-semibold">
                        {advantage.title}
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* */}
          {/* <div>
            <h1>Image Upload</h1>
            <button id="uploadButton" onClick={handleUpload}>Upload Image from Clipboard</button>
            <button id="getImageButton" onClick={handleGetImage}>Get Image</button>
            {imageUrl && <img src={imageUrl} alt="Pasted Image" />}
          </div> */}

          <div className="py-10 text-center">
            <div className="container px-4 mx-auto">
              <div>
                <div className="flex justify-center ">
                  <h2 className="text-3xl font-bold mb-4 border-b-[6px] border-yellow-400">
                    IPEC Pedagogy
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {userData.ipecPedagogy.map((pedagogy, index) => (
                    <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                      <img
                        src={pedagogyImgArr[index]}
                        alt="Detailed Theory Portions"
                        className="w-24 mx-auto mb-4"
                      />
                      <h3 className="mb-2 text-xl font-semibold">
                        {pedagogy.title}
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {pedagogy.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default About;
