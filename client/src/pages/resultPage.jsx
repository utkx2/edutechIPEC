import React from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const { score } = useParams(); 

  return (
    <div className="bg-[#d1e9f9] flex items-center justify-center h-auto h-[calc(100vh-531px)]">
      <div className="p-8 bg-white shadow-lg rounded-xl border-[2px] border-[#1f1d5a]">
        <h1 className="mb-4 text-3xl">Your Score is <span className="text-blue-500">{score}</span>!</h1>
        <p className="text-gray-700">Keep up the good work!</p>
      </div>
    </div>
  );
};

export default ResultPage;
