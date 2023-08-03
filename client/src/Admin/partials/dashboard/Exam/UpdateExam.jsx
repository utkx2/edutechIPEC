import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../../../config'
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { Cloudinary as CloudinaryCore } from '@cloudinary/url-gen';
import axios from 'axios';

const UpdateExamForm = () => {
    const cloudinary = new CloudinaryCore({ cloud: { cloudName: "doaxcuxex" } });
    const { id } = useParams();
    const [examName, setExamName] = useState("");
    const [examInstruction, setExamInstruction] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [totalTime, setTotalTime] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const [questionMarks, setQuestionMarks] = useState('');
    const [textNegativeMarks, setTextNegativeMarks]= useState('');
    const [mcqNegativeMarks, setMcqNegativeMarks] = useState('');
    const [options, setOptions] = useState([
      { text: "", imageUrl: "" },
      { text: "", imageUrl: "" },
      { text: "", imageUrl: "" },
      { text: "", imageUrl: "" },
      { text: "", imageUrl: "" },
    ]);
    const navigate = useNavigate();
    const [questionAnswers, setQuestionAnswers] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        async function fetchExamData() {
            try {
                const response = await fetch(`${BASE_URL}exam/byid/${id}`);
                if (response.ok) {
                    const examData = await response.json();
                    console.log(examData);
                    setExamName(examData.exam.name);
                    setQuestions(examData.exam.questions);
                    setAnswers(examData.answers)
                    setMaxMarks(examData.exam.maxMarks)
                    setTotalTime(examData.exam.totalTime)
                    setMcqNegativeMarks(examData.exam.mcqNegativeMarks)
                    setTextNegativeMarks(examData.exam.textNegativeMarks)
                    setQuestionMarks(examData.exam.questionMarks)
                    console.log(examData.exam)
                } else {
                    console.log('Failed to fetch exam data.');
                }
            } catch (error) {
                console.error('Error occurred while fetching exam data:', error);
            }
        }
        fetchExamData();
    }, []);
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
    const handleUpload = async (index, optionIndex, option) => {
        console.log(index);
        try {
            const clipboardImage = await navigator.clipboard.read();
            const imageBlob = clipboardImage[0].types.includes('image/png')
                ? await clipboardImage[0].getType('image/png')
                : await clipboardImage[0].getType('image/jpeg');
            console.log(imageBlob);

            handleCloudinaryUpload(imageBlob, index, optionIndex, option)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleSaveExam = async () => {
        console.log('Exam Name:', examName);
        console.log('Questions:', questions);

        try {
            const response = await fetch(`${BASE_URL}exam/byid/${id}`, {
                method: 'PUT', // Use PUT method to update the exam
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: examName,
                instructions: examInstruction,
                questions: questions.map((question) => ({
                  text: question.text,
                  imageUrl: question.imageUrl,
                  options: question.options.map((option) => ({
                    text: option.text,
                    imageUrl: option.imageUrl,
                  })),
                  correctOption: question.correctOption,
                  type: question.type,
                  correctTextInputAnswer: question.correctTextInputAnswer
                })),
                totalTime: totalTime,
                maxMarks: maxMarks,
                questionMarks: questionMarks,
                textNegativeMarks: textNegativeMarks,
                mcqNegativeMarks: mcqNegativeMarks
                }),
            });
            if (response.ok) {
                console.log('Exam updated successfully!');
                navigate('/dashboard/list');
            } else {
                console.log('Failed to update the exam.');
            }
        } catch (error) {
            console.error('Error occurred while updating the exam:', error);
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
      if (type === 'multiple-correct') {
        setAnswers([...answers, []]);
      }
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
    const handleChangeCorrectTextInputAnswer = (questionIndex, correctTextInputAnswer) => {
        const updatedAnswers = [...questions];
        updatedAnswers[questionIndex].correctTextInputAnswer = correctTextInputAnswer;
        setQuestions(updatedQuestions);
    };
    const handleAddAnswer = (questionIndex) => {
      setQuestionAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: [...(prevAnswers[questionIndex] || []), { number: "" }],
      }));
    };
    const handleRemoveAnswer = (questionIndex, answerIndex) => {
      setQuestionAnswers((prevAnswers) => {
        const currentAnswers = prevAnswers[questionIndex] || [];
        const updatedAnswers = currentAnswers.filter((answer, index) => index !== answerIndex);
        return { ...prevAnswers, [questionIndex]: updatedAnswers };
      });
    };
    const handleChangeAnswerNumber = (questionIndex, answerIndex, number) => {
      setQuestionAnswers((prevAnswers) => {
        const currentAnswers = prevAnswers[questionIndex] || [];
        const updatedAnswers = currentAnswers.map((answer, index) =>
          index === answerIndex ? { ...answer, number } : answer
        );
        return { ...prevAnswers, [questionIndex]: updatedAnswers };
      });
    };console.log(answers,"answerIndex");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                <main>
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                        <div className="grid gap-6 grid-cols-15">
                            <div className="p-4 ">
                                <h1 className="mb-4 text-2xl font-bold">Update Exam</h1>
                                <div className="mb-4">
                                    <label htmlFor="examName" className="block mb-2 font-bold text-gray-700">
                                        Exam Name
                                    </label>
                                    <div className="md:flex justify-between">
                  <div className="mb-4">
                    <label
                      htmlFor="totalTime"
                      className="block mb-2 font-bold text-gray-700"
                    >
                      Total Time taken for exam:
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
                </div><div className="mb-4">
                  <label
                    htmlFor="examName"
                    className="block text-gray-700 font-bold mb-2"
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
                                </div>
                                {questions.length > 0 && questions.map((question, questionIndex) => (
                                    <div key={questionIndex} className="mb-4">
                                        <h2 className="mb-2 text-lg font-bold">Question {questionIndex + 1}</h2>
                                        <label htmlFor={`question-${questionIndex}`} className="block mb-2 font-bold text-gray-700">
                                            {question.type === 'multiple-choice' ? 'Multiple Choice Question' : 'Text Input Question'}
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id={`question-${questionIndex}`}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                            value={question.text}
                                            onChange={(e) => handleChangeQuestionText(questionIndex, e.target.value)}
                                            placeholder="Enter Question Text"
                                        />
                                        <label htmlFor={`questionImage-${questionIndex}`} className="block text-gray-700 font-bold mt-2 mb-2">
                                            Image URL
                                        </label>
                                        <div>
                                            <button id="uploadButton" onClick={() => handleUpload(questionIndex, 0, false)}>Upload Image from Clipboard</button>
                                            {/* <button id="getImageButton" onClick={handleGetImage}>Get Image</button> */}
                                            {imageUrl && <img src={imageUrl} alt="Pasted Image" />}
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            id={`questionImage-${questionIndex}`}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                            value={question.imageUrl}
                                            onChange={(e) => handleChangeQuestionImage(questionIndex, e.target.value)}
                                            placeholder="Enter Image URL (optional)"
                                        />
                                        {question.type === 'multiple-choice' && (
                                            <>
                                                <div className="mt-2 mb-1 font-bold">Options:</div>
                                                {question.options.map((option, optionIndex) => (
                                                    <div key={optionIndex} className="md:flex items-center mb-2">
                                                        <input
                                                            required
                                                            type="text"
                                                            className="px-4 py-2 mr-2 border border-gray-300 rounded-md w-60"
                                                            value={option.text}
                                                            onChange={(e) => handleChangeOptionText(questionIndex, optionIndex, e.target.value)}
                                                            placeholder={`Enter Option ${optionIndex + 1}`}
                                                        />
                                                        <label
                                                            htmlFor={`optionImage-${questionIndex}-${optionIndex}`}
                                                            className="block mb-2 font-bold text-gray-700"
                                                        >
                                                            Image URL
                                                        </label>
                                                        <div>
                                                            <button id="uploadButton" onClick={() => handleUpload(questionIndex, optionIndex, true)}>Upload Image from Clipboard</button>
                                                        </div>
                                                        <input
                                                            required
                                                            type="text"
                                                            id={`optionImage-${questionIndex}-${optionIndex}`}
                                                            className="w-64 px-4 py-2 border border-gray-300 rounded-md"
                                                            value={option.imageUrl}
                                                            onChange={(e) => handleChangeOptionImage(questionIndex, optionIndex, e.target.value)}
                                                            placeholder="Enter Image URL for Option (optional)"
                                                        />

                                                        <button
                                                            type="button"
                                                            className="ml-3 font-bold text-red-600"
                                                            onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className="mr-1" />
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

                                                <label htmlFor={`correctOption-${questionIndex}`} className="block mb-2 font-bold text-gray-700">
                                                    Correct Option (Choose 1, 2, 3, or 4)
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    id={`correctOption-${questionIndex}`}
                                                    className="w-16 border border-gray-300 px-4 py-2 rounded-md"
                                                    value={(question.correctOption) + 1} // Display 1-based option on the form
                                                    onChange={(e) => handleChangeCorrectOption(questionIndex, parseInt(e.target.value) - 1)} // Convert to 0-based index internally
                                                />
                                            </>
                                        )}
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
                        <div className="mt-2 mb-1 font-bold">Answers:</div>
                        {questionAnswers[questionIndex]?.map((answer, answerIndex) => (
                          <div
                            key={answerIndex}
                            className="flex items-center mb-2"
                          >
                            <input
                              required
                              type="number"
                              className="w-16 border border-gray-300 px-4 py-2 rounded-md"
                              value={answer.number}
                              id='correctOption'
                              onChange={(e) =>
                                handleChangeAnswerNumber(
                                  questionIndex,
                                  answerIndex,
                                  e.target.value
                                )
                              }
                              placeholder={` ${answerIndex + 1}`}
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
                      </>
                    )}                                        {question.type === 'text-input' && (
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
                                                    onChange={(e) => handleChangeCorrectTextInputAnswer(questionIndex, e.target.value)}
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
                            </div>
                            <div className='text-center'>
                    <button
                          type="button"
                          className="px-4 py-2 ml-2 font-bold text-blue-600 border border-blue-600 rounded"
                          onClick={() => handleSaveExam()}
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-1" />
                          Save
                        </button>
                    </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default UpdateExamForm;