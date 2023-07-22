import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Exam = () => {
    const navigate = useNavigate();
    const [examData, setExamData] = useState(null);
    const [responses, setResponses] = useState({});
    const [rdata, setData] = useState({});
    var submitted = false;
    const { examId } = useParams();

    useEffect(() => {
        // Fetch exam data by ID from the API
        fetch(`http://localhost:3000/api/exam/student-exam/${examId}`)
            .then((response) => response.json())
            .then((data) => {
                setExamData(data.exam);
                // Initialize responses with empty values for each question
                const initialResponses = {};
                data.questions.forEach((question) => {
                    initialResponses[question._id] = '';
                });
                setResponses(initialResponses);
            })
            .catch((error) => {
                console.error('Error fetching exam data:', error);
            });
    }, []);

    const handleChangeQuestion = (questionId, questionNumber, value) => {
        (function () {
            handleInputChange(questionId, value);
            handleDataChange(questionNumber, value);
        })();
    };


    const handleDataChange = (questionNumber, value) => {
        setData((prevResponses) => ({
            ...prevResponses,
            [questionNumber]: value,
        }));
    }

    const handleInputChange = (questionId, value) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionId]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Log the exam responses to the console
        console.log('Exam Responses:', responses);
        const user = JSON.parse(localStorage.getItem("user"));

        // Step 3: Call the API to get the exam score and store the exam result
        const userId = user._id;
        console.log(rdata);
        axios.post(`http://localhost:3000/api/exam/getscore/${examId}`, {
            submittedAnswers: responses,
            userId: userId,
            response: rdata
        })
            .then((response) => {
                console.log('Exam Score:', response.data.score);
                navigate(`/result/${response.data.score}`)
            })
            .catch((error) => {
                console.error('Error getting exam score:', error);
            });
    };

    return (
        <div className="bg-gray-100 text-white ">
            <form
                id="examForm"
                className="max-w-7xl mx-auto space-y-4 p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                {examData && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-center text-black">{examData.name}</h1>
                        {examData.questions.map((question, questionIndex) => (
                            <div key={question._id} className="shadow-lg  p-28  rounded-2xl bg-white">
                                <p className="font-bold text-3xl text-black mb-2">{` ${questionIndex + 1}) ${question.text}`}</p>
                                {question.imageUrl && <img className="w-72 h-48 p-2 ml-0 lg:ml-96" src={question.imageUrl} alt={`Question ${question.text}`} />}
                                {question.type === 'multiple-choice' ? (
                                    question.options.map((option, optionIndex) => (
                                        <div key={option._id} className="flex items-center space-x-2 text-black">
                                            <input
                                                type="radio"
                                                name={`question_${question._id}`}
                                                value={optionIndex}
                                                id={`q_${question._id}_option_${option._id}`}
                                                onChange={(e) => handleChangeQuestion(question._id, questionIndex + 1, e.target.value)}
                                            />
                                            <label className='grid grid-cols-2 pb-2' htmlFor={`q_${question._id}_option_${option._id}`}>
                                                {option.imageUrl && <img className="w-48 h-48 p-2 mt-1" src={option.imageUrl} alt={`Option ${option.text}`} />}
                                                <span className={option.imageUrl? ' mt-20 ml-8 text-xl font-medium' : ' '}>{option.text}</span>
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center space-x-2 text-black">
                                        <input
                                            type="text"
                                            name={`question_${question._id}`}
                                            value={responses[question._id]}
                                            onChange={(e) => handleChangeQuestion(question._id, questionIndex + 1, e.target.value)}
                                            placeholder="Enter your answer..."
                                        />

                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}

                <button
                    type="submit"
                    className="bg-black hover:bg-black text-white py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Exam;
