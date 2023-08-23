import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL, Download_URL } from '../config';

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
            // console.log(responseSamplePaper.data);
            setSamplePaper(responseSamplePaper.data);
            // console.log(carousel)
            const responseBrochure = await axios.get(`${BASE_URL}download/brochure/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem("token"),
                },
            });
            console.log(responseBrochure.data);
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

    // useEffect(() => {
    //     console.log("samplePaper:", samplePaper);
    // }, [samplePaper]);

    useEffect(() => {
        console.log("Brochure:", brochure);
        //console.log(MedicalBrochureLinks);
        console.log(brochure[0])
    }, [brochure]);

    // useEffect(() => {
    //     console.log("Syllabus:", syllabus);
    //     console.log(syllabus[0]);
    //     {
    //         syllabus.map((syllabusData) => {
    //             console.log(syllabusData.className);
    //         })
    //     }
    // }, [syllabus]);

    return (
        <div className="min-h-screen py-8 bg-[#d1e9f9]">
            <div className="max-w-6xl px-8 py-4 mx-auto">
                <h1 className="mb-8 text-4xl font-bold text-center">IPEC Education Material</h1>

                <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-2 ">
                    {/* E-brochure Section */}
                    {/* medical Brochure */}
                    <div className="flex flex-col items-center justify-around px-10 py-4 bg-white shadow-lg rounded-xl border-[2px] border-[#1f1d5a]">
                        <h2 className="w-full mb-4 text-xl font-semibold text-center">Medical E-brochure</h2>
                        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                            {
                                MedicalBrochureLinks.map((links, index = 0) => (
                                    <div className="px-4 py-2 font-medium text-center text-[#1f1d5a] font-bold bg-yellow-400 rounded-lg whitespace-nowrap cursor-pinter hover:bg-yellow-500 cursor-pointer " key={links._id}>
                                        <a href={`${Download_URL}`+ links}>Links {index + 1}</a>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    {/* engineering Brochure */}
                    <div className="flex flex-col items-center justify-around px-10 py-4 bg-white shadow-lg rounded-xl border-[2px] border-[#1f1d5a]">
                        <h2 className="w-full mb-4 text-xl font-semibold text-center">Engineering E-brochure</h2>
                        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                            {
                                brochure[0]?.fileLink.map((links, index = 0) => (
                                    <div className="px-4 py-2 font-medium text-center text-[#1f1d5a] font-bold bg-yellow-400 rounded-lg whitespace-nowrap cursor-pinter hover:bg-yellow-500 cursor-pointer " key={links._id}>
                                        <a href={`${Download_URL}`+ links}>Links {index + 1}</a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Syllabus Section */}
                    <div className="flex flex-col items-center justify-around px-10 py-4 bg-white shadow-lg rounded-xl border-[2px] border-[#1f1d5a]">
                        <h2 className="w-full mb-4 text-xl font-semibold text-center">Syllabus</h2>
                        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">

                            {
                                syllabus?.map((syllabusData) => (
                                    <div className="px-4 py-2 font-medium text-center text-[#1f1d5a] font-bold bg-yellow-400 rounded-lg whitespace-nowrap cursor-pinter hover:bg-yellow-500 cursor-pointer " key={syllabusData._id}>
                                        {
                                            syllabusData.className === "12th Pass" ? (<a href={`${Download_URL}` + syllabusData.fileLink[0]}> {syllabusData.className}</a>) : <a href={`${Download_URL}`+ syllabusData.fileLink[0]}>Class {syllabusData.className}</a>
                                        }
                                        {/* <a href={syllabusData.fileLink[0]}>Class {syllabusData.className}</a> */}
                                    </div>
                                ))
                            }
                            {/* <div className="px-4 py-2 font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600">
                                <a href="/syllabus/class-6">Class 6</a>
                            </div> */}


                        </div>
                    </div>

                    {/* Sample Paper Section */}
                    <div className="flex flex-col items-center justify-around px-10 py-4 bg-white shadow-lg rounded-xl whitespace-nowrap border-[2px] border-[#1f1d5a]">
                        <h2 className="w-full mb-4 text-xl font-semibold text-center">Sample Paper</h2>
                        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                            {
                                samplePaper?.map((samplePaperData) => (
                                    <div className="px-4 py-2 font-medium text-center text-[#1f1d5a] font-bold bg-yellow-400 rounded-lg whitespace-nowrap cursor-pinter hover:bg-yellow-500 cursor-pointer " key={samplePaperData._id}>
                                        {
                                            samplePaperData.className === "12th Pass" ? (<a href={`${Download_URL}`+ samplePaperData.fileLink[0]}> {samplePaperData.className}</a>) : <a href={`${Download_URL}`+ samplePaperData.fileLink[0]}>Class {samplePaperData.className}</a>
                                        }

                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Downloads;
