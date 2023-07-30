import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../../../config";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const AddExamForm = () => {
  const { id } = useParams();
  const [examName, setExamName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  // Fetch exam data from the API and prefill the form fields
  useEffect(() => {
    async function fetchExamData() {
      try {
        const response = await fetch(`${BASE_URL}exam/byid/${id}`);
        if (response.ok) {
          const examData = await response.json();
          console.log(examData);
          setExamName(examData.exam.name);
          setQuestions(examData.exam.questions);
          setAnswers(examData.exam.questions.map((question) => []));
        } else {
          console.log("Failed to fetch exam data.");
        }
      } catch (error) {
        console.error("Error occurred while fetching exam data:", error);
      }
    }

    fetchExamData();
  }, []);

  const handleSaveExam = async () => {
    console.log("Exam Name:", examName);
    console.log("Questions:", questions);

    try {
      const response = await fetch(`${BASE_URL}exam/byid/${id}`, {
        method: "PUT", // Use PUT method to update the exam
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: examName, questions }),
      });
      if (response.ok) {
        console.log("Exam updated successfully!");
        navigate("/dashboard/list");
      } else {
        console.log("Failed to update the exam.");
      }
    } catch (error) {
      console.error("Error occurred while updating the exam:", error);
    }
  };

  const handleAddQuestion = (type) => {
    const newQuestion = {
      type: type,
      text: "",
      imageUrl: "",
      options: type === "multiple-choice" ? [{ text: "", imageUrl: "" }] : [],
      correctOption: 0,
      correctTextInputAnswer: "",
    };
    setQuestions([...questions, newQuestion]);
    setAnswers([...answers, []]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    const updatedAnswers = [...answers];
    updatedAnswers.splice(index, 1);
    setAnswers(updatedAnswers);
  };

  const handleChangeQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleChangeQuestionImage = (index, imageUrl) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].imageUrl = imageUrl;
    setQuestions(updatedQuestions);
  };

  const handleChangeOptionText = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const handleChangeOptionImage = (questionIndex, optionIndex, imageUrl) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].imageUrl = imageUrl;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ text: "", imageUrl: "" });
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleChangeCorrectOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];

    if (question.type === "multiple-choice") {
      question.correctOption = optionIndex;
    } else if (question.type === "multiple-correct") {
      if (!question.hasOwnProperty("correctOptions")) {
        question.correctOptions = []; // Initialize correctOptions array if it doesn't exist
      }

      const optionIndexInCorrectOptions =
        question.correctOptions.indexOf(optionIndex);
      if (optionIndexInCorrectOptions === -1) {
        question.correctOptions.push(optionIndex);
      } else {
        question.correctOptions.splice(optionIndexInCorrectOptions, 1);
      }
    }

    setQuestions(updatedQuestions);
  };

  const handleChangeCorrectTextInputAnswer = (
    questionIndex,
    correctTextInputAnswer
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctTextInputAnswer =
      correctTextInputAnswer;
    setQuestions(updatedQuestions);
  };

  const handleAddAnswer = (questionIndex) => {
    const updatedAnswers = [...answers];
    const lastAnswerIndex = updatedAnswers[questionIndex].length - 1;
    const lastAnswer = updatedAnswers[questionIndex][lastAnswerIndex];
    const newAnswerNumber =
      lastAnswer !== undefined ? parseInt(lastAnswer.number) + 1 : 1;
    const newAnswer = { number: newAnswerNumber.toString() };
    updatedAnswers[questionIndex].push(newAnswer);
    setAnswers(updatedAnswers);
  };

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex].splice(answerIndex, 1);
    setAnswers(updatedAnswers);
  };

  const handleChangeAnswerNumber = (questionIndex, answerIndex, number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex][answerIndex].number = number;
    setAnswers(updatedAnswers);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            {/* Dashboard actions */}
            {/* Cards */}
            <div className="grid gap-6 grid-cols-15">
              {/* Table (Top Channels) */}
              <div className="p-4 ">
                <h1 className="mb-4 text-2xl font-bold">Update Exam</h1>
                <div className="flex justify-between">
                  <div className="mb-4">
                    <label
                      htmlFor="examName"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Total Time taken for exam:
                    </label>
                    <input
                      required
                      type="text"
                      id="total_time"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      // value={examName}
                      // onChange={(e) => setExamName(e.target.value)}
                      placeholder="Total Time "
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="examName"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Total Marks for Exam:
                    </label>
                    <input
                      required
                      type="text"
                      id="total_exam"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      // value={examName}
                      // onChange={(e) => setExamName(e.target.value)}
                      placeholder="Total Marks"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="examName"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Negative Marks for MCQ:
                    </label>
                    <input
                      required
                      type="text"
                      id="Negative_Marks_Mcq"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      // value={examName}
                      // onChange={(e) => setExamName(e.target.value)}
                      placeholder="Negative Marks"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="examName"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Negative Marks for Integer type:
                    </label>
                    <input
                      required
                      type="text"
                      id="Negative_Marks_Integer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      // value={examName}
                      // onChange={(e) => setExamName(e.target.value)}
                      placeholder="Negative Marks"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="examName"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Per Question Marks:
                    </label>
                    <input
                      required
                      type="text"
                      id="per_Question_Mark"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      // value={examName}
                      // onChange={(e) => setExamName(e.target.value)}
                      placeholder="Per Question Marks"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="examName"
                    className="block mb-2 font-bold text-gray-700"
                  >
                    Exam Name
                  </label>
                  <input
                    required
                    type="text"
                    id="examName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="Enter Exam Name"
                  />
                </div>
                {questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-4">
                    <h2 className="mb-2 text-lg font-bold">
                      Question {questionIndex + 1}
                    </h2>
                    <label
                      htmlFor={`question-${questionIndex}`}
                      className="block mb-2 font-bold text-gray-700"
                    >
                      {question.type === "multiple-choice"
                        ? "Multiple Choice Question"
                        : "Text Input Question"}
                    </label>
                    <input
                      required
                      type="text"
                      id={`question-${questionIndex}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      value={question.text}
                      onChange={(e) =>
                        handleChangeQuestionText(questionIndex, e.target.value)
                      }
                      placeholder="Enter Question Text"
                    />

                    <label
                      htmlFor={`questionImage-${questionIndex}`}
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Image URL
                    </label>
                    <input
                      required
                      type="text"
                      id={`questionImage-${questionIndex}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      value={question.imageUrl}
                      onChange={(e) =>
                        handleChangeQuestionImage(questionIndex, e.target.value)
                      }
                      placeholder="Enter Image URL (optional)"
                    />

                    {question.type === "multiple-choice" && (
                      <>
                        <div className="mt-2 mb-1 font-bold">Options:</div>
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center mb-2"
                          >
                            <input
                              required
                              type="text"
                              className="px-4 py-2 mr-2 border border-gray-300 rounded-md w-60"
                              value={option.text}
                              onChange={(e) =>
                                handleChangeOptionText(
                                  questionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Enter Option ${optionIndex + 1}`}
                            />

                            <label
                              htmlFor={`optionImage-${questionIndex}-${optionIndex}`}
                              className="block mb-2 font-bold text-gray-700"
                            >
                              Image URL
                            </label>
                            <input
                              required
                              type="text"
                              id={`optionImage-${questionIndex}-${optionIndex}`}
                              className="w-64 px-4 py-2 border border-gray-300 rounded-md"
                              value={option.imageUrl}
                              onChange={(e) =>
                                handleChangeOptionImage(
                                  questionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              placeholder="Enter Image URL for Option (optional)"
                            />

                            <button
                              type="button"
                              className="ml-3 font-bold text-red-600"
                              onClick={() =>
                                handleRemoveOption(questionIndex, optionIndex)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="mr-1"
                              />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="font-bold text-blue-600"
                          onClick={() => handleAddOption(questionIndex)}
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-1" />
                          Add Option
                        </button>

                        <label
                          htmlFor={`correctOption-${questionIndex}`}
                          className="block mb-2 font-bold text-gray-700"
                        >
                          Correct Option (Choose 1, 2, 3, or 4)
                        </label>
                        <input
                          required
                          type="number"
                          id={`correctOption-${questionIndex}`}
                          className="w-16 border border-gray-300 px-4 py-2 rounded-md"
                          value={question.correctOption + 1} // Display 1-based option on the form
                          onChange={(e) =>
                            handleChangeCorrectOption(
                              questionIndex,
                              parseInt(e.target.value) - 1
                            )
                          } // Convert to 0-based index internally
                        />
                      </>
                    )}

                    {question.type === "multiple-correct" && (
                      <>
                        <div className="mt-2 mb-1 font-bold">Options:</div>
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center mb-2"
                          >
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center mb-2"
                              >
                                <input
                                  required
                                  type="text"
                                  className="px-4 py-2 mr-2 border border-gray-300 rounded-md w-60"
                                  value={option.text}
                                  onChange={(e) =>
                                    handleChangeOptionText(
                                      questionIndex,
                                      optionIndex,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Enter Option ${
                                    optionIndex + 1
                                  }`}
                                />

                                <label
                                  htmlFor={`optionImage-${questionIndex}-${optionIndex}`}
                                  className="block mb-2 font-bold text-gray-700"
                                >
                                  Image URL
                                </label>
                                <input
                                  required
                                  type="text"
                                  id={`optionImage-${questionIndex}-${optionIndex}`}
                                  className="w-64 px-4 py-2 border border-gray-300 rounded-md"
                                  value={option.imageUrl}
                                  onChange={(e) =>
                                    handleChangeOptionImage(
                                      questionIndex,
                                      optionIndex,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter Image URL for Option (optional)"
                                />

                                <input
                                  type="checkbox"
                                  className="form-checkbox h-5 w-5 text-blue-600 rounded ml-3"
                                  checked={option.isCorrect}
                                  onChange={() =>
                                    handleChangeCorrectOption(
                                      questionIndex,
                                      optionIndex
                                    )
                                  }
                                />

                                <button
                                  type="button"
                                  className="ml-3 font-bold text-red-600"
                                  onClick={() =>
                                    handleRemoveOption(
                                      questionIndex,
                                      optionIndex
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="mr-1"
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        ))}
                        <button
                          type="button"
                          className="font-bold text-blue-600"
                          onClick={() => handleAddOption(questionIndex)}
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-1" />
                          Add Option
                        </button>

                        <label
                          htmlFor={`correctOption-${questionIndex}`}
                          className="block mb-2 font-bold text-gray-700"
                        >
                          Correct Options (Choose all that apply)
                        </label>
                        <div className="flex items-center">
                          {question.options.map((option, optionIndex) => (
                            <label
                              key={optionIndex}
                              className="flex items-center mr-4"
                            >
                              <input
                                required
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 rounded"
                                checked={(
                                  question.correctOptions || []
                                ).includes(optionIndex)} // Handle the case when correctOptions is undefined
                                onChange={() =>
                                  handleChangeCorrectOption(
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                              />
                              <span className="ml-2 text-gray-700">{`Option ${
                                optionIndex + 1
                              }`}</span>
                            </label>
                          ))}
                        </div>

                        <div className="mt-2 mb-1 font-bold">Answers:</div>
                        {answers[questionIndex].map((answer, answerIndex) => (
                          <div
                            key={answerIndex}
                            className="flex items-center mb-2"
                          >
                            <input
                              required
                              type="number"
                              className="w-16 border border-gray-300 px-4 py-2 rounded-md"
                              value={answer.number}
                              onChange={(e) =>
                                handleChangeAnswerNumber(
                                  questionIndex,
                                  answerIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Enter Answer ${answerIndex + 1}`}
                            />
                            <button
                              type="button"
                              className="ml-3 font-bold text-red-600"
                              onClick={() =>
                                handleRemoveAnswer(questionIndex, answerIndex)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="mr-1"
                              />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="font-bold text-blue-600"
                          onClick={() => handleAddAnswer(questionIndex)}
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-1" />
                          Add Answer
                        </button>

                        <label
                          htmlFor={`correctOption-${questionIndex}`}
                          className="block mb-2 font-bold text-gray-700"
                        >
                          Correct Option (Choose 1, 2, 3, or 4)
                        </label>
                        <input
                          required
                          type="number"
                          id={`correctOption-${questionIndex}`}
                          className="w-16 border border-gray-300 px-4 py-2 rounded-md"
                          value={question.correctOption + 1} // Display 1-based option on the form
                          onChange={(e) =>
                            handleChangeCorrectOption(
                              questionIndex,
                              parseInt(e.target.value) - 1
                            )
                          } // Convert to 0-based index internally
                        />
                      </>
                    )}

                    {question.type === "text-input" && (
                      <>
                        <label
                          htmlFor={`correctTextInputAnswer-${questionIndex}`}
                          className="block mb-2 font-bold text-gray-700"
                        >
                          Correct Text Input Answer
                        </label>
                        <input
                          required
                          type="text"
                          id={`correctTextInputAnswer-${questionIndex}`}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          value={question.correctTextInputAnswer}
                          onChange={(e) =>
                            handleChangeCorrectTextInputAnswer(
                              questionIndex,
                              e.target.value
                            )
                          }
                          placeholder="Enter Correct Text Input Answer"
                        />
                      </>
                    )}

                    <button
                      type="button"
                      className="px-4 py-2 ml-3 font-bold text-red-600 border border-red-600 rounded"
                      onClick={() => handleRemoveQuestion(questionIndex)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-1" />
                      Remove Question
                    </button>
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    className="px-4 py-2 font-bold text-blue-600 border border-blue-600 rounded"
                    onClick={() => handleAddQuestion("multiple-choice")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    Add Single Correct Question
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 ml-2 font-bold text-blue-600 border border-blue-600 rounded"
                    onClick={() => handleAddQuestion("text-input")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    Add Text Input Question
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 ml-2 font-bold text-blue-600 border border-blue-600 rounded"
                    onClick={() => handleAddQuestion("multiple-correct", true)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    Add Multiple Correct Question
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 ml-2 font-bold text-blue-600 border border-blue-600 rounded"
                    onClick={() => handleAddQuestion("matrices", true)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    Add Matrices type Question
                  </button>
                </div>

                <div>
                  <button
                    className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded"
                    onClick={handleSaveExam}
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-1" />
                    Save Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddExamForm;
