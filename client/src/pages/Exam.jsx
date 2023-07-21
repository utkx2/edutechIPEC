import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
    const navigate = useNavigate();
    const [examData, setExamData] = useState(null);
    const [responses, setResponses] = useState({});
    const [rdata, setData] = useState({});
    var submitted = false;

    useEffect(() => {
        // Fetch exam data by ID from the API
        fetch('http://localhost:3000/api/exam/student-exam/64ba81a0eddf65d1a41c47a3')
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
      

    const handleDataChange = (questionNumber, value) =>{
        setData((prevResponses) => ({
            ...prevResponses,
            [questionNumber]: value,
          }));
    }

    const handleInputChange = (questionId, value) => {
        // Find the question object corresponding to the questionId
        const question = examData.questions.find((q) => q._id === questionId);
      
        // Update the responses with the selected option/text input for the question
        setResponses((prevResponses) => ({
          ...prevResponses,
          [questionId]: value,
        }));
      
        // Call handleDataChange function here with the updated responses and question.questionNumber
        if (question) {
          handleDataChange(questionId, value, question.questionNumber);
        }
      };
      

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log the exam responses to the console
        console.log('Exam Responses:', responses);
        const user = JSON.parse(localStorage.getItem("user"));

          // Step 3: Call the API to get the exam score and store the exam result
          const examId = '64ba81a0eddf65d1a41c47a3';
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
            // Handle errors if any
          });
      };

    return (
        <div className="bg-red-500 text-white ">
            <form
                id="examForm"
                className="max-w-3xl mx-auto space-y-4 p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                {examData && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-center text-black">{examData.name}</h1>
                        {examData.questions.map((question) => (
                            <div key={question._id} className="shadow-lg p-4 border border-red-800 rounded bg-white">
                                <p className="font-medium text-black mb-2">{`Question ${question.questionNumber}: ${question.text}`}</p>
                                {question.imageUrl && <img className="w-48 h-48 p-2 m-2" src={question.imageUrl} alt={`Question ${question.text}`} />}
                                {question.type === 'multiple-choice' ? (
                                    question.options.map((option, optionIndex) => (
                                        <div key={option._id} className="flex items-center space-x-2 text-black">
                                            <input
                                                type="radio"
                                                name={`question_${question._id}`}
                                                value={optionIndex}
                                                id={`q_${question._id}_option_${option._id}`}
                                                onChange={(e) => handleChangeQuestion(question._id,question.questionNumber, e.target.value)}
                                            />
                                            <label htmlFor={`q_${question._id}_option_${option._id}`}>
                                                {option.imageUrl && <img className="w-48 h-48 p-2 m-2" src={option.imageUrl} alt={`Option ${option.text}`} />}
                                                {option.imageUrl && option.text}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center space-x-2 text-black">
                                        <input
                                            type="text"
                                            name={`question_${question._id}`}
                                            value={responses[question._id]}
                                            onChange={(e) => handleInputChange(question._id, e.target.value)}
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
