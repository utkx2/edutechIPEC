import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../../../config'
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Navigate, useNavigate } from 'react-router-dom';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { Cloudinary as CloudinaryCore } from '@cloudinary/url-gen';
import axios from 'axios';

const AddExamForm = () => {

  const cloudinary = new CloudinaryCore({ cloud: { cloudName: "doaxcuxex" } });

  const [examName, setExamName] = useState('');
  const [examInstruction, setExamInstruction] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState('');


  const handleCloudinaryUpload = (imageBlob, index, optionIndex, option) => {
    try {
      console.log(option);
      const formData = new FormData();
      formData.append('file', imageBlob);
      formData.append('upload_preset', 'abfrwxrc');

      fetch(`https://api.cloudinary.com/v1_1/doaxcuxex/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the Cloudinary response here
          console.log('Cloudinary Response:', data);
          const imageUrl = data.secure_url;
          setImageUrl(imageUrl);

          if (option) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].options[optionIndex].imageUrl = imageUrl;
            setQuestions(updatedQuestions);
          }
          else {
            const updatedQuestions = [...questions];
            updatedQuestions[index].imageUrl = imageUrl;

            console.log(updatedQuestions[index].imageUrl)
            setQuestions(updatedQuestions);
          }

          return imageUrl;
        })
        .catch((error) => {
          console.error('Error uploading image to Cloudinary:', error);
        });
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  // const handleGetImage = async () => {
  //   try {
  //     // Fetch image data from the server
  //     const response = await fetch(`${BASE_URL}image/64c49d3ca552407bfd454ad3`); // Replace "your-image-id" with the actual ID of the image you want to fetch

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.base64Data);
  //       setImageBase64(data.base64Data);

  //     } else {
  //       alert('Failed to fetch image data');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('Something went wrong');
  //   }
  // };

  const handleUpload = async (index, optionIndex, option) => {
    console.log(index);
    try {
      // Request image from clipboard (as base64)

      const clipboardImage = await navigator.clipboard.read();
      const imageBlob = clipboardImage[0].types.includes('image/png')
        ? await clipboardImage[0].getType('image/png')
        : await clipboardImage[0].getType('image/jpeg');
      // Convert Blob to base64 string
      console.log(imageBlob);

      handleCloudinaryUpload(imageBlob, index, optionIndex, option)
    } catch (error) {
      console.error('Error:', error);
      //alert('Something went wrong');
    }
  }

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
  };

  const handleChangeQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleChangeQuestionImage = (index, imageUrl) => {
    const updatedQuestions = [...questions];
    console.log(imageUrl);
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
    updatedQuestions[questionIndex].options.push({ text: '', imageUrl: '' });
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

  const handleSaveExam = async () => {
    console.log('Exam Name:', examName);
    console.log('Exam Instructions:', examInstruction);
    console.log('Questions:', questions);

    try {
      const response = await fetch(`${BASE_URL}exam/newexam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: examName, instructions: examInstruction, questions }),
      });
      if (response.ok) {
        console.log('Exam saved successfully!');
        navigate('/dashboard/list');
      } else {
        console.log('Failed to save the exam.');
      }
    } catch (error) {
      console.error('Error occurred while saving the exam:', error);
    }
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
                <h1 className="text-2xl font-bold mb-4">Add New Exam</h1>
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
                  <label htmlFor="examName" className="block text-gray-700 font-bold mb-2">
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
                </div>
                <div className="mb-4">
                  <label htmlFor="examName" className="block text-gray-700 font-bold mb-2">
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
                    <h2 className="text-lg font-bold mb-2">Question {questionIndex + 1}</h2>
                    <label htmlFor={`question-${questionIndex}`} className="block text-gray-700 font-bold mb-2">
                      {question.type === 'multiple-choice' ? 'Multiple Choice Question' : 'Text Input Question'}
                    </label>
                    <input
                      type="text"
                      id={`question-${questionIndex}`}
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                      value={question.text}
                      onChange={(e) => handleChangeQuestionText(questionIndex, e.target.value)}
                      placeholder="Enter Question Text"
                    />

                    <label htmlFor={`questionImage-${questionIndex}`} className="block text-gray-700 font-bold mb-2">
                      Image URL
                    </label>
                    <div>
                      <button id="uploadButton" onClick={() => handleUpload(questionIndex, 0, false)}>Upload Image from Clipboard</button>
                      {/* <button id="getImageButton" onClick={handleGetImage}>Get Image</button> */}
                      {imageUrl && <img src={imageUrl} alt="Pasted Image" />}
                    </div>
                    <input
                      type="text"
                      id={`questionImage-${questionIndex}`}
                      className="w-full border border-gray-300 px-4 py-2 rounded-md"
                      value={question.imageUrl}
                      onChange={(e) => handleChangeQuestionImage(questionIndex, e.target.value)}
                      placeholder="Enter Image URL (optional)"
                    />

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

                    {question.type === 'multiple-choice' && (
                      <>
                        <div className="mt-2 mb-1 font-bold">Options:</div>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center mb-2">
                            <input
                              type="text"
                              className="border border-gray-300 px-4 py-2 rounded-md mr-2 w-60"
                              value={option.text}
                              onChange={(e) => handleChangeOptionText(questionIndex, optionIndex, e.target.value)}
                              placeholder={`Enter Option ${optionIndex + 1}`}
                            />

                            <label
                              htmlFor={`optionImage-${questionIndex}-${optionIndex}`}
                              className="block text-gray-700 font-bold mb-2"
                            >
                              Image URL
                            </label>
                            <div>
                              <button id="uploadButton" onClick={() => handleUpload(questionIndex, optionIndex, true)}>Upload Image from Clipboard</button>
                              {/* <button id="getImageButton" onClick={handleGetImage}>Get Image</button>
                              {imageUrl && <img src={imageUrl} alt="Pasted Image" />} */}
                            </div>
                            <input
                              type="text"
                              id={`optionImage-${questionIndex}-${optionIndex}`}
                              className="w-64 border border-gray-300 px-4 py-2 rounded-md"
                              value={option.imageUrl}
                              onChange={(e) => handleChangeOptionImage(questionIndex, optionIndex, e.target.value)}
                              placeholder="Enter Image URL for Option (optional)"
                            />

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

                        <label htmlFor={`correctOption-${questionIndex}`} className="block text-gray-700 font-bold mb-2">
                          Correct Option (Choose 1, 2, 3, or 4)
                        </label>
                        <input
                          type="number"
                          id={`correctOption-${questionIndex}`}
                          className="w-16 border border-gray-300 px-4 py-2 rounded-md"
                          value={question.correctOption + 1} // Display 1-based option on the form
                          onChange={(e) => handleChangeCorrectOption(questionIndex, parseInt(e.target.value) - 1)} // Convert to 0-based index internally
                        />
                      </>
                    )}

                    {question.type === 'text-input' && (
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
                          onChange={(e) => handleChangeCorrectTextInputAnswer(questionIndex, e.target.value)}
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
                    onClick={() => handleAddQuestion('multiple-choice')}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    Add Multiple Choice Question
                  </button>
                  <button
                    type="button"
                    className="text-blue-600 font-bold ml-2 border border-blue-600 py-2 px-4 rounded"
                    onClick={() => handleAddQuestion('text-input')}
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
      </div >
    </div >
  );
};

export default AddExamForm;
