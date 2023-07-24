import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

const Downloads = () => {

    const [userData, setUserData] = useState({});
    const [brochure, setBrochure] = useState([]);
    const [syllabus, setSyllabus] = useState([]);
    const [samplePaper, setSamplePaper] = useState([]);
    const [MedicalBrochureLinks, setMedicalBrochureLinks] = useState([]);

    const fetchData = async () => {
        try {
            const responseSamplePaper = await axios.get(
                `${BASE_URL}download/samplePaper/get`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        auth: localStorage.getItem("token"),
                    },
                }
            );
            console.log(responseSamplePaper.data);
            setSamplePaper(responseSamplePaper.data);
            // console.log(carousel)
            const responseBrochure = await axios.get(`${BASE_URL}download/brochure/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem("token"),
                },
            });
            const responseSyllabus = await axios.get(
                `${BASE_URL}download/syllabus/get`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        auth: localStorage.getItem("token"),
                    },
                }
            );
            setBrochure(responseBrochure.data);
            setSyllabus(responseSyllabus.data);
            setMedicalBrochureLinks(responseBrochure.data[1].fileLink);
            // setPrograms(responsePrograms.data);
            //setUserData(response.data)
            // console.log(responseCarousel.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log("samplePaper:", samplePaper);
    }, [samplePaper]);

    useEffect(() => {
        console.log("Brochure:", brochure);
        //   console.log(MedicalBrochureLinks);
    }, [brochure]);

    useEffect(() => {
        console.log("Syllabus:", syllabus);
        // console.log(syllabus[0]);
        {
            syllabus.map((syllabusData) => {
                console.log(syllabusData.className);
            })
        }
    }, [syllabus]);

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-8 py-4">
                <h1 className="text-4xl font-bold text-center mb-8">IPEC Education Material</h1>

                <div className="text-center grid grid-cols-2 lg:grid-cols-2 gap-8 md:grid-cols-3">
                    {/* E-brochure Section */}
                    {/* medical Brochure */}
                    <div className="bg-white rounded-lg shadow-lg p-6 ">
                        <h2 className="text-xl font-semibold mb-4">Medical E-brochure</h2>
                        <div className="grid grid-cols-4 gap-4 mx-16">
                            {
                                MedicalBrochureLinks.map((links, index = 0) => (
                                    <div className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center" key={links._id}>
                                        <a href={links}>Links {index + 1}</a>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    {/* engineering Brochure */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Engineering E-brochure</h2>
                        <div className="grid grid-cols-4  gap-4 mx-16">
                            {
                                brochure[0]?.fileLink.map((links, index = 0) => (
                                    <div className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center" key={links._id}>
                                        <a href={links}>Links {index + 1}</a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Syllabus Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Syllabus</h2>
                        <div className="grid grid-cols-4 gap-4 mx-16">

                            {
                                syllabus?.map((syllabusData) => (
                                    <div className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-center" key={syllabusData._id}>
                                        {
                                            syllabusData.className === "12th Pass" ? (<a href={syllabusData.fileLink[0]}> {syllabusData.className}</a>) : <a href={syllabusData.fileLink[0]}>Class {syllabusData.className}</a>
                                        }
                                        {/* <a href={syllabusData.fileLink[0]}>Class {syllabusData.className}</a> */}
                                    </div>
                                ))
                            }
                            {/* <div className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-center">
                                <a href="/syllabus/class-6">Class 6</a>
                            </div> */}


                        </div>
                    </div>

                    {/* Sample Paper Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Sample Paper</h2>
                        <div className="grid     grid-cols-4 gap-4 mx-16">
                            {
                                samplePaper?.map((samplePaperData) => (
                                    <div className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-center" key={samplePaperData._id}>
                                        {
                                            samplePaperData.className === "12th Pass" ? (<a href={samplePaperData.fileLink[0]}> {samplePaperData.className}</a>) : <a href={samplePaperData.fileLink[0]}>Class {samplePaperData.className}</a>
                                        }

                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Downloads;
