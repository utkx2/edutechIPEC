import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const { score } = useParams(); 
  const navigate = useNavigate();

  const handleTextInputChange = (e) => {
    navigate(`/exam`);
  };

  return (
    <div className="bg-[#d1e9f9] flex items-center justify-center h-auto h-[calc(100vh-531px)]">
      <div className="p-8 bg-white shadow-lg rounded-xl border-[2px] border-[#1f1d5a]">
        <h1 className="mb-4 text-3xl">Your Score is <span className="text-blue-500">{score}</span>!</h1>
        <p className="text-gray-700">Keep up the good work!</p>
        
        <div className='text-center'>
        <button onClick={handleTextInputChange} className="bg-blue-500 text-white rounded px-4 py-2 mt-4">
          Back to Exam
        </button>
      </div></div>
    </div>
  );
};

export default ResultPage;