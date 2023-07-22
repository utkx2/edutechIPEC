import React, { useState, useEffect } from 'react';

const PastScoresTable = () => {
  const [pastScores, setPastScores] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [currentPage, setCurrentPage] = useState(1);
  const [scoresPerPage] = useState(3);

  useEffect(() => {
    const fetchPastScores = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/examresults/score/${user._id}`);
        const data = await response.json();
        setPastScores(data);
      } catch (error) {
        console.error('Error fetching past scores:', error);
      }
    };

    fetchPastScores();
  }, [user._id]);

  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;
  const currentScores = pastScores.slice(indexOfFirstScore, indexOfLastScore);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
    {/* Dashboard actions */}
    {/* Cards */}
    <div className="grid gap-6 grid-cols-15">
      {/* Table */}
      <section className="container p-6 mx-auto overflow-x-auto font-mono">
        <h1 className="mb-4 text-xl font-bold">Past Scores</h1>
        {Array.isArray(pastScores) && pastScores.length > 0 ? (
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-2xl">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                  <thead>
                    <tr className="font-semibold tracking-wide text-left text-gray-900 uppercase bg-gray-300 border-b border-gray-600 text-md">
                      <th className="px-4 py-3">SN</th>
                      <th className="px-4 py-3">Exam Name</th>
                      <th className="px-4 py-3">Score</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {currentScores.map((score, index) => (
                      <tr className="text-gray-700" key={index}>
                        <td className="px-4 py-3 border ">{index + 1}</td>
                        <td className="px-4 py-3 border ">{score.examName}</td>
                        <td className="px-4 py-3 border">{score.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between px-4 py-3 bg-gray-300 border-t border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <button
                    className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &#x2190;
                  </button>
                  <span className="px-2 text-sm">{currentPage}</span>
                  <button
                    className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(pastScores.length / scoresPerPage)
                    }
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>No past scores found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default PastScoresTable;