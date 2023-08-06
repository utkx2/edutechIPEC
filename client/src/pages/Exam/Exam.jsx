import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config'
import { Navigate, useNavigate } from "react-router-dom";
const questionsData = [

];

const subjects = ["Physics", "Chemistry", "Mathematics"];

function OnlineExamPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [attemptedButUnanswered, setAttemptedButUnanswered] = useState(false);
  const [rightSectionVisible, setRightSectionVisible] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [examData, setExamData] = useState(null);
  const [responses, setResponses] = useState({});
  const [rdata, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { examId } = useParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubjectClick = (subjectName) => {
    const selectedSubject = examData.subjects.find(
      (subject) => subject.name === subjectName
    );

    useEffect(() => {
      // Fetch exam data by ID from the API
      const isSubmitted = JSON.parse(localStorage.getItem(`exam_${examId}_submitted`));
      if (isSubmitted) {
        // Exam is already submitted, redirect to a different page
        navigate('/exam');
        return;
      }
    };

    const [visitedQuestions, setVisitedQuestions] = useState(
      new Array(questionsData.length).fill(false)
    );

    useEffect(() => {
      const fetchExamData = async () => {
        try {
          const response = await fetch(`${BASE_URL}exam/student-exam/${examId}`)
          if (!response.ok) {
            throw new Error("Failed to fetch exam data");
          }
          const data = await response.json();
          setExamData(data.exam);
          setTimer(data.exam.totalTime)
          console.log(data.exam);
          console.log(data.exam.totalTime);
        } catch (error) {
          console.error(error);
        }
      };

      fetchExamData();
    }, [examId]);

    const handleTextInputChange = (e) => {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = e.target.value;
      setSelectedAnswers(newSelectedAnswers);
    };

    const handleInputChange = (questionId, value) => {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [questionId]: value,
      }));
    };

    const handleSubmitExam = () => {
      // e.preventDefault();
      // Log the exam examData to the console

      if (!examData) {
        console.error('ExamData');
        return;
      }

      console.log('Exam examData:', examData);
      const user = JSON.parse(localStorage.getItem("user"));

      // Step 3: Convert examData and selectedAnswers to the desired format
      const responsePayload = {};
      const submittedAnswersPayload = {};

      examData.questions.forEach((question, index) => {
        const questionNumber = index + 1;
        const selectedAnswer = selectedAnswers[index];
        if (selectedAnswer !== undefined && selectedAnswer !== null) {
          // Use the selected answer if it's not empty
          responsePayload[questionNumber] = selectedAnswer;
          submittedAnswersPayload[question._id] = selectedAnswer;
        }
      });

      // Step 4: Call the API to get the exam score and store the exam result
      const userId = user._id;
      console.log(responsePayload);
      console.log(submittedAnswersPayload);
      axios.post(`${BASE_URL}exam/getscore/${examId}`, {
        response: responsePayload,
        submittedAnswers: submittedAnswersPayload,
        userId: userId,
      })
        .then((examData) => {
          console.log('Exam Score:', examData.data.score);
          localStorage.setItem(`exam_${examId}_submitted`, JSON.stringify(true));
          navigate(`/result/${examData.data.score}`);
          setIsSubmitted(true);
        })
        .catch((error) => {
          console.error('Error getting exam score:', error);
        });
    };

    useEffect(() => {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [timer]);

    const formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
      if (timer === 0 && !isSubmitted) {
        handleSubmitExam(); // Call the submit function when the timer reaches zero
      }
    }, [timer, isSubmitted]);

    const saveAndNext = () => {
      if (isAnswered) {
        // Save the selected answer
        setSelectedAnswers((prevSelectedAnswers) => {
          const newSelectedAnswers = [...prevSelectedAnswers];
          newSelectedAnswers[currentQuestionIndex] =
            selectedAnswers[currentQuestionIndex] || "Marked for Review";
          return newSelectedAnswers;
        });

        // Move to the next question
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < examData.questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
        } else {
          // If it's the last question, move to the first question
          setCurrentQuestionIndex(0);
        }
      } else {
        // Show an alert if the user tries to navigate without selecting an option
        setAttemptedButUnanswered(true);
        alert("Please choose an option before proceeding to the next question.");
      }
    };

    const handleOptionChange = (index, checked) => {
      const questionType = examData.questions[currentQuestionIndex].type;
      const newSelectedAnswers = [...selectedAnswers];

      if (!newSelectedAnswers[currentQuestionIndex]) {
        newSelectedAnswers[currentQuestionIndex] = []; // Initialize the array if it's not present
      }

      // For multiple-choice and multiple-correct type questions, store selected option indices
      if (questionType === "multiple-choice" || questionType === "multiple-correct") {
        if (checked) {
          // If the selected option index is not in the array, add it (select)
          newSelectedAnswers[currentQuestionIndex].push(index);
        } else {
          // Otherwise, remove it from the array (deselect)
          newSelectedAnswers[currentQuestionIndex] = newSelectedAnswers[
            currentQuestionIndex
          ].filter((selectedIndex) => selectedIndex !== index);
        }
      }

      setSelectedAnswers(newSelectedAnswers);
      setAttemptedButUnanswered(false); // Reset to false when an option is selected.
    };

    const markedForReview = () => {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = "Marked for Review";
      setSelectedAnswers(newSelectedAnswers);
    };

    const isAnswered = selectedAnswers[currentQuestionIndex] !== "";

    const getQuestionButtonClass = (questionIndex) => {
      const isAnswered = selectedAnswers[questionIndex] !== "";
      const isMarkedForReview =
        selectedAnswers[questionIndex] === "Marked for Review";
      const isNotVisited = !visitedQuestions[questionIndex];

      if (questionIndex === currentQuestionIndex) {
        return "bg-blue-600 text-white"; // Current question
      } else if (isMarkedForReview) {
        return "bg-yellow-500 text-white"; // Answered and marked for review
      } else if (isAnswered) {
        return "bg-green-500 text-white"; // Answered
      } else if (isNotVisited) {
        return "bg-white text-black"; // Not visited
      } else if (!isNotVisited) {
        return "bg-red-500 text-white"; // Not answered but visited
      }
      else if (!isAnswered) {
        return "bg-violet-500 text-white"
      }
    };


    const renderOptions = () => {
      if (!examData || !examData.questions || !examData.questions[currentQuestionIndex]) {
        // If examData is not available yet or the current question is not available, return null or a loading state
        return null;
      }

      const questionType = examData.questions[currentQuestionIndex].type;

      if (questionType === "multiple-choice" || questionType === "multiple-correct") {
        // For multiple-choice and multiple-correct questions, render checkboxes
        return (
          <div>
            {examData.questions[currentQuestionIndex].options.map((option, index) => (
              <label key={index} className="block text-xl font-bold mb-2">
                <input
                  type="checkbox"
                  name={`option_${index}`}
                  checked={selectedAnswers[currentQuestionIndex]?.includes(index) || false}
                  onChange={(e) => handleOptionChange(index, e.target.checked)}
                  className="mr-2"
                />
                {option.imageUrl && (
                  <img
                    src={option.imageUrl}
                    alt={`Option ${index + 1}`}
                    className="max-h-24 mr-2"
                  />
                )}
                {option.text}
              </label>
            ))}
          </div>
        );
      } else {
        // For text-input type questions, render an input box
        return (
          <div>
            <input
              type="text"
              value={selectedAnswers[currentQuestionIndex]}
              onChange={handleTextInputChange}
              className="w-96 px-4 py-2 border border-gray-400 rounded"
              placeholder="Enter your answer here"
            />
          </div>
        );
      }
    };

    const renderNavigationRows = () => {
      if (!examData || !examData.questions) {
        // If examData is not available yet, return an empty div
        return <div></div>;
      }

      const rows = [];
      const totalQuestions = examData.questions.length;
      const buttonsPerRow = 3;

      for (let i = 0; i < totalQuestions; i += buttonsPerRow) {
        const rowButtons = [];
        for (let j = i; j < i + buttonsPerRow && j < totalQuestions; j++) {
          rowButtons.push(
            <button
              key={j}
              onClick={() => handleQuestionNavigation(j)}
              className={`flex-1 py-4 mr-2 rounded ${selectedAnswers !== ""
                ? " text-black"
                : "bg-red-500 text-white"
                } ${getQuestionButtonClass(j)} ${j === currentQuestionIndex ? "bg-blue-600" : ""
                }`}
            >
              {`Q${j + 1}`}
            </button>
          );
        }
        rows.push(
          <div key={i} className="flex mb-2">
            {rowButtons}
          </div>
        );
      }

      return rows;
    };

    if (!examData) {
      // Exam data is not available yet, return null or a loading spinner
      return null;
    }


    return (
      <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
        {/* ... Left section ... */}
        <div className="flex-1 pb-96 border-r-2 border-black">
          <div className="flex-1 p-4 md:p-8">
            <div className="md:flex md:items-center md:justify-between mb-4">
              <h1 className="flex mt-1">
                {examData.subjects.map((subject, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubjectClick(subject.name)}
                    className="px-4 py-2 mr-4 rounded bg-blue-500 text-white"
                  >
                    {subject.name}
                  </button>
                ))}
              </h1>
              <div className="absolute mt-5 md:mt-0 right-4 md:right-96 font-semibold text-xl">
                Time Left: {formatTime(timer)}
              </div>
            </div>
            {examData &&
              examData.questions &&
              examData.questions[currentQuestionIndex] && (
                <>
                  <hr className="mt-4" />
                  <div className="mb-4">
                    <div className="flex text-lg font-bold mt-1">
                      Question No. {currentQuestionIndex + 1}.
                      <p className="absolute hidden md:flex right-4 md:right-96">
                        Mark/s:{" "}
                        <span className=" text-green-700">
                          {examData.questionMarks}
                        </span>{" "}
                        | Negative Mark/s:{" "}
                        <span className="text-red-700">
                          {examData.mcqNegativeMarks}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <p className="mb-4 font-bold text-3xl">
                    {examData.questions[currentQuestionIndex].text}
                  </p>
                  {examData.questions[currentQuestionIndex].imageUrl ? (
                    <img
                      src={examData.questions[currentQuestionIndex].imageUrl}
                      // alt={`Question ${currentQuestionIndex + 1}`}
                      className="w-800 h-600 mx-auto mb-4"
                    />
                  ) : null}
                  <div>
                    <div>
                      {renderOptions()}
                    </div>
                  </div>
                </>
              )}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-black p-4">
              <div className="md:ml-20">
                <button
                  onClick={() =>
                    setSelectedAnswers((prevSelectedAnswers) => {
                      const newSelectedAnswers = [...prevSelectedAnswers];
                      newSelectedAnswers[currentQuestionIndex] = "";
                      return newSelectedAnswers;
                    })
                  }
                  className={`px-4 py-2 mr-4 rounded ${selectedAnswers[currentQuestionIndex] !== ""
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                    }`}
                >
                  Clear Response
                </button>
                <button
                  onClick={() =>
                    setSelectedAnswers((prevSelectedAnswers) => {
                      const newSelectedAnswers = [...prevSelectedAnswers];
                      newSelectedAnswers[currentQuestionIndex] =
                        "Marked for Review";
                      return newSelectedAnswers;
                    })
                  }
                  className={`px-4 mt-5 md:mt-0 py-2 rounded ${selectedAnswers[currentQuestionIndex] !== ""
                    ? "bg-gray-400  text-white"
                    : `bg-yellow-500 ${markedForReview}`
                    }`}
                >
                  Marked for Review
                </button>
              </div>
              <div className="md:ml-96 md:pl-96">
                <button
                  onClick={saveAndNext}
                  disabled={!isAnswered}
                  className={`px-4 py-2 mr-4 rounded ${selectedAnswers[currentQuestionIndex] !== ""
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                >
                  Save and Next
                </button>
                <button
                  // onClick={submitAnswer}
                  disabled={!isAnswered}
                  onClick={handleSubmitExam}
                  className={`px-4 py-2 mt-5 md:mt-0 rounded ${selectedAnswers[currentQuestionIndex] !== ""
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-2 min-w-1/4 border-r-2 border-black border-1-2 bg-gray-200 flex-shrink-0 ${rightSectionVisible ? '' : 'hidden'}`}>
          <div className="mb-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg5ksHjzMIjf__4XViE2UamI31OUfxJb1YzQ&usqp=CAU"
              alt="Profile"
              className="w-24 h-24  ml-28 mb-16  rounded-full"
            />
            <hr />
            <div className="border-y-2 border-black">
              <div className="flex ml-4 my-6 ">
                {/* Add color indication elements here */}
                <div className="w-4 h-4 p-5  inline-block  bg-green-500 mr-2"></div>
                <span className="">Answered</span>
                <div className="w-4 h-4 p-5  inline-block bg-red-500 ml-4 mr-2"></div>
                <span className="">Not Answered</span>
              </div>
              <div className="flex my-6">
                <div className="w-4 h-4 p-5 inline-block bg-white ml-4 mr-2"></div>
                <span className="">Not Visited</span>
                <div className="w-4 h-4 p-5 inline-block bg-yellow-500 ml-4 mr-2"></div>
                <span className="">Marked for Review</span>
              </div>
              <div className="my-6 flex">
                <div className="w-4 h-4 p-5 inline-block bg-violet-500 ml-4 mr-2"></div>
                <span className="">Marked but not Answered</span>
              </div>
            </div>
          </div>
          {renderNavigationRows()}
        </div>
        {/* </div> */}
      </div>
    );
  };

  export default Exam;