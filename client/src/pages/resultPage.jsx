import React from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const { score } = useParams(); 

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white rounded p-8 shadow">
        <h1 className="text-3xl mb-4">Your Score is <span className="text-blue-500">{score}</span>!</h1>
        <p className="text-gray-700">Keep up the good work!</p>
      </div>
    </div>
  );
};

export default ResultPage;
