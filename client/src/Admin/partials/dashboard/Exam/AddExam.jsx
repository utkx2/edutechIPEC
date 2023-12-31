import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../../../config";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Navigate, useNavigate } from "react-router-dom";
import { CloudinaryContext, Image } from "cloudinary-react";
import { Cloudinary as CloudinaryCore } from "@cloudinary/url-gen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddExamForm = () => {
  const cloudinary = new CloudinaryCore({ cloud: { cloudName: "doaxcuxex" } });
  const [examName, setExamName] = useState("");
  const [examInstruction, setExamInstruction] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [totalTime, setTotalTime] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [questionMarks, setQuestionMarks] = useState("");
  const [textNegativeMarks, setTextNegativeMarks] = useState("");
  const [mcqNegativeMarks, setMcqNegativeMarks] = useState("");
  const [className, setClassName] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const handleCloudinaryUpload = (imageBlob, index, optionIndex, option) => {
    try {
      // console.log(option);
      const formData = new FormData();
      formData.append("file", imageBlob);
      formData.append("upload_preset", "abfrwxrc");
      fetch(`https://api.cloudinary.com/v1_1/doaxcuxex/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Cloudinary Response:"
          // , data
          );
          const imageUrl = data.secure_url;
          setImageUrl(imageUrl);
          if (option) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].options[optionIndex].imageUrl = imageUrl;
            setQuestions(updatedQuestions);
          } else {
            const updatedQuestions = [...questions];
            updatedQuestions[index].imageUrl = imageUrl;

            // console.log(updatedQuestions[index].imageUrl);
            setQuestions(updatedQuestions);
          }
          return imageUrl;
        })
        .catch((error) => {
          console.error("Error uploading image to Cloudinary:", error);
        });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };
  const handleUpload = async (index, optionIndex, option) => {
    // console.log(index);
    try {
      const clipboardImage = await navigator.clipboard.read();
      const imageBlob = clipboardImage[0].types.includes("image/png")
        ? await clipboardImage[0].getType("image/png")
        : await clipboardImage[0].getType("image/jpeg");
      // console.log(imageBlob);
      handleCloudinaryUpload(imageBlob, index, optionIndex, option);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAddQuestion = (type) => {
    const newQuestion = {
      type: type,
      text: "",
      imageUrl: "",
      options: type === "multiple-choice" ? [{ text: "", imageUrl: "" }] : [],
      correctOption: type === "multiple-correct" ? [] : null,
      correctTextInputAnswer: "",
    };
    setQuestions([...questions, newQuestion]);
    setAnswers([...answers, []]);
  };
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  const handleChangeQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };
  const handleChangeQuestionImage = (index, imageUrl) => {
    const updatedQuestions = [...questions];
    // console.log(imageUrl);
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
  const handleChangeCorrectOption = (questionIndex, correctOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = correctOption;
    setQuestions(...[updatedQuestions]);
    // console.log(answers, "answer");
    // console.log(questions, "question");
  };
  const handleClassChange = (event) => {
    setClassName(event.target.value); // Update the className state
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
  const handleSaveExam = async () => {
    // console.log("Exam Name:", examName);
    // console.log("Exam Instructions:", examInstruction);
    // console.log("Questions:", questions);
    // console.log("className", className);
    try {
      const response = await fetch(`${BASE_URL}exam/newexam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: examName,
          instructions: examInstruction,
          subjects: subjects,     // code written by me
          questions: questions.map((question, questionIndex) => ({
            text: question.text,
            imageUrl: question.imageUrl,
            options: question.options.map((option) => ({
              text: option.text,
              imageUrl: option.imageUrl,
            })),
            correctOption: question.correctOption,
            type: question.type,
            correctTextInputAnswer: question.correctTextInputAnswer,
          })),
          totalTime: totalTime,
          maxMarks: maxMarks,
          questionMarks: questionMarks,
          textNegativeMarks: textNegativeMarks,
          mcqNegativeMarks: mcqNegativeMarks,
          className: className,
        }),
      });
      if (response.ok) {
        // console.log("Exam saved successfully!");
        navigate("/dashboard/list");
        toast.success("Submitted successfully");
      } else {
        console.log("Failed to save the exam.");
      }
    } catch (error) {
      console.error("Error occurred while saving the exam:", error);
      toast.error("Oops! Something went wrong");
    }
  };
  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex].splice(answerIndex, 1);
    setAnswers(updatedAnswers);
  };
  // console.log(answers, "answerIndex");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', startingQuestionNumber: '', endingQuestionNumber: '' }]);
  };
  const handleChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };
  const handleChangeCorrectAnswer = (questionIndex, correctAnswer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = correctAnswer;
    setQuestions(updatedQuestions);
  };
  return (
    <div className="flex flex-col h-screen sm:flex-row sm:overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <main>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-15">
              <div className="p-4 ">
                <h1 className="text-2xl font-bold mb-4">Add New Exam</h1>
                <div className="md:flex  justify-between">
                  <div className="mb-4">
                    <label
                      htmlFor="totalTime"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Total Time taken in seconds:
                    </label>
                    <input
                      required
                      type="text"
                      id="totalTime"
                      value={totalTime}
                      onChange={(e) => setTotalTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="Total Time "
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="maxMarks"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Total Marks for Exam:
                    </label>
                    <input
                      required
                      type="text"
                      id="maxMarks"
                      value={maxMarks}
                      onChange={(e) => setMaxMarks(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="Total Marks"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="mcqNegativeMarks"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Negative Marks for MCQ:
                    </label>
                    <input
                      required
                      type="text"
                      id="mcqNegativeMarks"
                      value={mcqNegativeMarks}
                      onChange={(e) => setMcqNegativeMarks(e.target.value)}
                      placeholder="Negative Marks"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="textNegativeMarks"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Negative Marks for Integer type:
                    </label>
                    <input
                      required
                      type="text"
                      id="textNegativeMarks"
                      value={textNegativeMarks}
                      onChange={(e) => setTextNegativeMarks(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="Negative Marks"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="questionMarks"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Per Question Marks:
                    </label>
                    <input
                      required
                      type="text"
                      id="questionMarks"
                      value={questionMarks}
                      onChange={(e) => setQuestionMarks(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="Per Question Marks"
                    />
                  </div>

                </div>
                <div className="mb-4">
                  <label
                    htmlFor="questionMarks"
                    className="block mb-2 font-bold text-gray-700"
                  >
                    Add Subjects
                  </label>
                  {subjects.map((subject, index) => (
                    <div key={index} className="mb-4 flex justify-between">
                      <input
                        type="text"
                        placeholder="Subject Name"
                        value={subject.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                        className=" mx-4  w-full  border border-gray-300 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Starting Question Number"
                        value={subject.startingQuestionNumber}
                        onChange={(e) => handleChange(index, 'startingQuestionNumber', e.target.value)}
                        className="px-12 w-full border border-gray-300 rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Ending Question Number"
                        value={subject.endingQuestionNumber}
                        onChange={(e) => handleChange(index, 'endingQuestionNumber', e.target.value)}
                        className=" mx-4 w-full py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ))}
                  <button onClick={handleAddSubject}>Add Subject</button>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="examName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Exam Name
                  </label>
                  <input
                    type="text"
                    id="examName"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="Enter Exam Name"
                  />
                  <div className='mb-4  mt-4'>
                    <label htmlFor="classSelector" className=' mr-2 font-bold text-gray-700'>Select a Class:</label>
                    <select id="classSelector" value={className} onChange={handleClassChange} >
                      <option value="">Select</option>
                      <option value="class 6">Class 6</option>
                      <option value="class 7">Class 7</option>
                      <option value="class 8">Class 8</option>
                      <option value="class 9">Class 9</option>
                      <option value="class 10">Class 10</option>
                      <option value="class 11">Class 11</option>
                      <option value="class 12">Class 12</option>
                      <option value="JEE">JEE</option>
                      <option value="NEET">NEET</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="examName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Exam Instructions
                  </label>
                  <input
                    type="text"
                    id="examInstruction"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    value={examInstruction}
                    onChange={(e) => setExamInstruction(e.target.value)}
                    placeholder="Enter Exam Instructions"
                  />
                </div>
                {questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-4">
                    <h2 className="text-lg font-bold mb-2">
                      Question {questionIndex + 1}
                    </h2>
                    <label
                      htmlFor={`question-${questionIndex}`}
                      className="block text-gray-700 font-bold mb-2"
                    >
                      {question.type === "multiple-choice"
                        ? "Multiple Choice Question"
                        : "Text Input Question"}
                    </label>
                    <input
                      type="text"
                      id={`question-${questionIndex}`}
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                      value={question.text}
                      onChange={(e) =>
                        handleChangeQuestionText(questionIndex, e.target.value)
                      }
                      placeholder="Enter Question Text"
                    />
                    <label
                      htmlFor={`questionImage-${questionIndex}`}
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Image URL
                    </label>
                    <div>
                      <button
                        id="uploadButton"
                        onClick={() => handleUpload(questionIndex, 0, false)}
                      >
                        Upload Image from Clipboard
                      </button>
                      {imageUrl && <img src={imageUrl} alt="Pasted Image" />}
                    </div>
                    <input
                      type="text"
                      id={`questionImage-${questionIndex}`}
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                      value={question.imageUrl}
                      onChange={(e) =>
                        handleChangeQuestionImage(questionIndex, e.target.value)
                      }
                      placeholder="Enter Image URL (optional)"
                    />
                    {question.type === "multiple-correct" && (
                      <>
                        <div className="mt-2 mb-1 font-bold">Options:</div>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="md:flex items-center mb-2">
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
                              onChange={(e) => handleChangeOptionImage(questionIndex, optionIndex, e.target.value)}
                              placeholder="Enter Image URL for Option (optional)"
                            /><div>
                              <button className='' id="uploadButton" onClick={() => handleUpload(questionIndex, optionIndex, true)}>Upload Image from Clipboard</button>
                            </div>
                            <button
                              type="button"
                              className="text-red-600 font-bold ml-3"
                              onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                            >
                              <FontAwesomeIcon icon={faTrash} className="mr-1" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="text-blue-600 font-bold"
                          onClick={() => handleAddOption(questionIndex)}
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-1" />
                          Add Option
                        </button>
                        <div className="mt-2 mb-1 font-bold">Correct Answer (Choose multiple)</div>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="md:flex items-center mb-2">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={question.correctOption.includes(optionIndex)}
                              onChange={() => {
                                const newCorrectOption = question.correctOption.includes(
                                  optionIndex
                                )
                                  ? question.correctOption.filter((index) => index !== optionIndex)
                                  : [...question.correctOption, optionIndex];
                                handleChangeCorrectAnswer(questionIndex, newCorrectOption);
                              }}
                            />
                            <span>{`Option ${optionIndex + 1}`}</span>
                          </div>
                        ))}
                      </>
                    )}
                    {question.type === "multiple-choice" && (
                      <>
                        <div className="mt-2 mb-1 font-bold">Options:</div>
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="md:flex items-center mb-2"
                          >
                            <input
                              type="text"
                              className="border border-gray-300 px-4 py-2 rounded-md mr-2 w-60"
                              value={option.text}
                              onChange={(e) =>
                                handleChangeOptionText(
                                  questionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Enters Option ${optionIndex + 1}`}
                            />
                            <label
                              htmlFor={`optionImage-${questionIndex}-${optionIndex}`}
                              className="block text-gray-700 font-bold mb-2"
                            >
                              Image URL
                            </label>
                            <div>
                              <button
                                id="uploadButton"
                                onClick={() =>
                                  handleUpload(questionIndex, optionIndex, true)
                                }
                              >
                                Upload Image from Clipboard
                              </button>
                            </div>
                            <input
                              type="text"
                              id={`optionImage-${questionIndex}-${optionIndex}`}
                              className="w-64 border border-gray-300 px-4 py-2 rounded-md"
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
                              className="text-red-600 font-bold ml-3"
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
                          className="text-blue-600 font-bold"
                          onClick={() => handleAddOption(questionIndex)}
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-1" />
                          Add Option
                        </button>
                        <label
                          htmlFor={`correctOption-${questionIndex}`}
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Correct Option (Choose 0, 1, 2 or 3)
                        </label>
                        <input
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
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Correct Text Input Answer
                        </label>
                        <input
                          type="text"
                          id={`correctTextInputAnswer-${questionIndex}`}
                          className="w-full border border-gray-300 px-4 py-2 rounded-md"
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
                      className="text-red-600 font-bold border border-red-600 py-2 px-4 rounded ml-3"
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
                    className="text-blue-600 font-bold border border-blue-600 py-2 px-4 rounded"
                    onClick={() => handleAddQuestion("multiple-choice")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    Add Multiple Choice Question
                  </button>
                  <button
                    type="button"
                    className="text-blue-600 font-bold ml-2 border border-blue-600 py-2 px-4 rounded"
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
                    className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
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