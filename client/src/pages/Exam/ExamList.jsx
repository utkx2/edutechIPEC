import React, { useState, useEffect } from 'react';
import PastScoresTable from './PastScores';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config'

const ExamPage = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}exam/active-exams`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setExams(data.exams);
                }
            })
            .catch((error) => {
                console.error('Error fetching exams:', error);
            });
    }, []);

    const handleCardClick = (examId) => {
        console.log(examId);
        const isSubmitted = JSON.parse(localStorage.getItem(`exam_${examId}_submitted`));
        if (isSubmitted) {
            // Exam is already submitted, redirect to a different page
            return;
        }
        navigate(`/exam/${examId}`)

    };

    const getFormattedTime = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleString([], options);
    };

    return (
        <div className="bg-[#d1e9f9]">
            {exams.length && (
                <div className="max-w-6xl px-4 py-10 mx-auto ">

                    <div className="container px-4 py-8 mx-auto bg-white shadow-2xl">
                        <div>
                            <h1 className="mb-4 text-3xl font-bold mr-14 lg:text-center">Exams</h1>
                            <div className="grid grid-cols-1 gap-4 mx-10 sm:grid-cols-2 md:grid-cols-3">
                                {exams.map((exam) => (
                                    <div
                                        key={exam._id}
                                        className="p-4 bg-[#1f1d5a] rounded-3xl shadow-md cursor-pointer hover:shadow-2xl "
                                        onClick={() => handleCardClick(exam._id)}
                                    >
                                        <h2 className="p-2 text-xl font-bold text-center bg-white rounded-[48px] ">{exam.name}</h2>
                                        <p className="mt-4 font-bold text-center text-white ">Started from: {getFormattedTime(exam.updatedAt)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <PastScoresTable />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamPage;
