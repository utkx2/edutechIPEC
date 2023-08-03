import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const questionsData = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Paris",
  },
  {
    id: 10,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "5",
  },
  {
    id: 32,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Pais",
  },
  {
    id: 4,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "54",
  },
  {
    id: 5,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "aris",
  },
  {
    id: 6,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "43",
  },
  {
    id: 7,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Pars",
  },
  {
    id: 8,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "423",
  },
  {
    id: 9,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Pis",
  },
  {
    id: 10,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Pifss",
  },
  {
    id: 11,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Pswis",
  },
  {
    id: 12,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Pidwqs",
  },
  {
    id: 13,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Piewws",
  },
  {
    id: 14,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Pites",
  },
  {
    id: 15,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Pitys",
  },
  {
    id: 15,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Preis",
  },
  {
    id: 16,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Piuys",
  },
  {
    id: 17,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Piyrds",
  },
  {
    id: 18,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Piergyrds",
  },
];

const subjects = ["Physics", "Chemistry", "Mathematics"];

function OnlineExamPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [attemptedButUnanswered, setAttemptedButUnanswered] = useState(false);
  const [rightSectionVisible, setRightSectionVisible] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(questionsData.length).fill("")
  );
  const [examData, setExamData] = useState(null);
  const { examId } = useParams();
  const handleSubjectClick = (subjectName) => {
    const selectedSubject = examData.subjects.find(
      (subject) => subject.name === subjectName
    );

    if (selectedSubject) {
      setCurrentQuestionIndex(selectedSubject.startingQuestionNumber - 1);
    }
  };
  
  

  const toggleRightSectionVisibility = () => {
    setRightSectionVisible((prevVisible) => !prevVisible);
  };

  const [visitedQuestions, setVisitedQuestions] = useState(
    new Array(questionsData.length).fill(false)
  );

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/exam/student-exam/${examId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch exam data");
        }
        const data = await response.json();
        setExamData(data.exam);
        console.log(examData);
        setTimer(data.exam.totalTime);
        console.log(timer);
        console.log(examData.subjects, "subject");
      } catch (error) {
        console.error(error);
        // Handle error here if necessary
      }
    };

    fetchExamData();
  }, [examId]);

  const handleQuestionNavigation = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
    setVisitedQuestions((prevVisitedQuestions) => {
      const newVisitedQuestions = [...prevVisitedQuestions];
      newVisitedQuestions[questionIndex] = true;
      return newVisitedQuestions;
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
    if(timer ===0){
      SubmitExam();
    }
  })


  const SubmitExam = (req, res) => {
    // alert("You have completed the exam!");
  }

  const submitAnswer = () => {
    // Save the selectedAnswer to your data storage (e.g., state or backend)
    // You need to implement the actual data storage logic here
    alert(`Are you really want to submit the exam?`);
  };


  const saveAndNext = () => {
    if (isAnswered) {
      setAttemptedButUnanswered(false);
      setSelectedAnswers((prevSelectedAnswers) => {
        const newSelectedAnswers = [...prevSelectedAnswers];
        newSelectedAnswers[currentQuestionIndex] =
          selectedAnswers[currentQuestionIndex] || "Marked for Review";
        return newSelectedAnswers;
      });
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questionsData.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setCurrentQuestionIndex(0); // Move to the first question when on the last question
      }
    } else {
      setAttemptedButUnanswered(true);
      alert("Please choose an option before proceeding to the next question.");
    }
  };

  const handleOptionChange = (e) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = e.target.value;
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
    else if(!isAnswered){
      return "bg-violet-500 text-white"
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
            className={`flex-1 py-4 mr-2 rounded ${
              selectedAnswers !== ""
                ? " text-black"
                : "bg-red-500 text-white"
            } ${getQuestionButtonClass(j)} ${
              j === currentQuestionIndex ? "bg-blue-600" : ""
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
    <div className="flex flex-col md:flex-row h-screen">
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
                  {examData.questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <label
                        key={index}
                        className="text-xl font-bold mb-2 flex items-center"
                      >
                        <input
                          type="radio"
                          name="option"
                          value={option.text}
                          checked={
                            selectedAnswers[currentQuestionIndex] ===
                            option.text
                          }
                          onChange={handleOptionChange}
                          className="mr-2"
                        />
                        {option.text}
                        {option.imageUrl ? (
                          <img
                            src={option.imageUrl}
                            // alt={`Option ${index + 1}`}
                            className="w-200 h-150 ml-5"
                          />
                        ) : null}
                      </label>
                    )
                  )}
                </div>
              </>
            )}
          <div className="flex absolute bottom-32 justify-between mt-4 border-t-2 pt-2 border-black">
            <div className="md:ml-20">
              <button
                onClick={() =>
                  setSelectedAnswers((prevSelectedAnswers) => {
                    const newSelectedAnswers = [...prevSelectedAnswers];
                    newSelectedAnswers[currentQuestionIndex] = "";
                    return newSelectedAnswers;
                  })
                }
                className={`px-4 py-2 mr-4 rounded ${
                  selectedAnswers[currentQuestionIndex] !== ""
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
                className={`px-4 mt-5 md:mt-0 py-2 rounded ${
                  selectedAnswers[currentQuestionIndex] !== ""
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
                className={`px-4 py-2 mr-4 rounded ${
                  selectedAnswers[currentQuestionIndex] !== ""
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                Save and Next
              </button>
              <button
                onClick={submitAnswer}
                disabled={!isAnswered}
                className={`px-4 py-2 mt-5 md:mt-0 rounded ${
                  selectedAnswers[currentQuestionIndex] !== ""
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                Submit Exam
              </button>
              {/* <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={toggleRightSectionVisibility}
      >
        {rightSectionVisible ? "Hide" : "Show"} Right Section
      </button> */}
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
}

export default OnlineExamPage;