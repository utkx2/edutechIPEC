import React, { useState, useEffect } from 'react';
import PastScoresTable from './PastScores';
import { useNavigate } from 'react-router-dom';

const ExamPage = () => {
    const [exams, setExams] = useState([]);
const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/api/exam/active-exams')
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
        // Assuming you have a function to navigate to the specific exam page based on the examId.
        // Replace 'navigateToExamPage' with your actual navigation function.
        // navigateToExamPage(examId);
        console.log(examId);
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
        <div className="container mx-auto px-4 py-8">
            <div>
                <h1 className="text-3xl font-bold mb-4">Exams</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {exams.map((exam) => (
                        <div
                            key={exam._id}
                            className="bg-white p-4 shadow-md rounded-md cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCardClick(exam._id)}
                        >
                            <h2 className="text-xl font-bold">{exam.name}</h2>
                            <p className="text-gray-500">Started from: {getFormattedTime(exam.updatedAt)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <PastScoresTable />
        </div>
    );
};

export default ExamPage;
