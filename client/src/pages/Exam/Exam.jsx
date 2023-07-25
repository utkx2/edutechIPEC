import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config'

const Exam = () => {
    const navigate = useNavigate();
    const [examData, setExamData] = useState(null);
    const [responses, setResponses] = useState({});
    const [rdata, setData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { examId } = useParams();

    useEffect(() => {
        // Fetch exam data by ID from the API
        const isSubmitted = JSON.parse(localStorage.getItem(`exam_${examId}_submitted`));
    if (isSubmitted) {
      // Exam is already submitted, redirect to a different page
      navigate('/exam');
      return;
    }

    // Fetch exam data by ID from the API
    fetch(`${BASE_URL}exam/student-exam/${examId}`)
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
      axios.post(`${BASE_URL}exam/getscore/${examId}`, {
        submittedAnswers: responses,
        userId: userId,
        response: rdata
      })
        .then((response) => {
          console.log('Exam Score:', response.data.score);
          // Set the submitted state to true
          setSubmitted(true);
          // Store that the exam is submitted in localStorage
          localStorage.setItem(`exam_${examId}_submitted`, JSON.stringify(true));
          // Redirect to the result page with the score
          navigate(`/result/${response.data.score}`);
        })
        .catch((error) => {
          console.error('Error getting exam score:', error);
        });
    };

  return (
    <div className="bg-gray-100 text-white">
      <form
        id="examForm"
        className="max-w-7xl mx-auto space-y-4 p-6 rounded-lg "
        onSubmit={handleSubmit}
      >
        {examData && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-black">
              {examData.name}
            </h1>
            {examData.questions.map((question, questionIndex) => (
              <div
                key={question._id}
                className="shadow-lg p-6 lg:p-12 rounded-2xl bg-white"
              >
                <p className="font-bold text-3xl text-black mb-2">{` ${
                  questionIndex + 1
                }) ${question.text}`}</p>
                {question.imageUrl && (
                  <img
                    className="w-48 h-32 md:w-72 md:h-48 p-2 mx-auto"
                    src={question.imageUrl}
                    alt={`Question ${question.text}`}
                  />
                )}
                {question.type === 'multiple-choice' ? (
                  question.options.map((option, optionIndex) => (
                    <div
                      key={option._id}
                      className="flex items-center space-x-2 text-black"
                    >
                      <input
                        type="radio"
                        name={`question_${question._id}`}
                        value={optionIndex}
                        id={`q_${question.id}_option${option._id}`}
                        onChange={(e) =>
                          handleChangeQuestion(
                            question._id,
                            questionIndex + 1,
                            e.target.value
                          )
                        }
                      />
                      <label
                        className={
                          option.imageUrl
                            ? 'grid grid-cols-2 pb-2'
                            : 'text-base font-medium'
                        }
                        htmlFor={`q_${question.id}_option${option._id}`}
                      >
                        {option.imageUrl && (
                          <img
                            className="w-24 h-24 p-2 mt-1"
                            src={option.imageUrl}
                            alt={`Option ${option.text}`}
                          />
                        )}
                        <span
                          className={
                            option.imageUrl ? 'mt-12 ml-4 text-xl font-medium' : ''
                          }
                        >
                          {option.text}
                        </span>
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center space-x-2 text-black">
                    <input
                      type="text"
                      name={`question_${question._id}`}
                      value={responses[question._id]}
                      onChange={(e) =>
                        handleChangeQuestion(
                          question._id,
                          questionIndex + 1,
                          e.target.value
                        )
                      }
                      placeholder="Enter your answer..."
                      className="w-full md:w-96"
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