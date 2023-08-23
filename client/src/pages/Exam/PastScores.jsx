import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
const PastScoresTable = () => {
  const [currentScores, setCurrentScores] = useState([]);
  const [pastScores, setPastScores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [scoresPerPage] = useState(4);
  const [examScores, setExamScores] = useState([]);
  useEffect(() => {
    const fetchExamScores = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}OfflineResults/getResult/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              auth: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setExamScores([data]); // Wrap the data in an array to match the currentScores structure
      } catch (error) {
        console.error("Error fetching exam scores:", error);
      }
    };

    const fetchPastScores = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}examresults/score/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              auth: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setCurrentScores(data);
      } catch (error) {
        console.error("Error fetching past scores:", error);
      }
    };
    fetchPastScores();
    fetchExamScores();
  }, [user._id]);

  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(currentScores.length / scoresPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
      <div className="grid gap-6 grid-cols-15">
        <section className="container p-6 mx-auto overflow-x-auto font-mono">
          <h1 className="mb-4 text-xl font-bold">Past Scores</h1>
          {currentScores && currentScores.length > 0 ? (
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-sm border-[2px] border-gray-400">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="font-semibold tracking-wide text-left text-gray-900 uppercase bg-gray-300 border-b border-gray-600 text-md">
                      <th className="px-4 py-3">SN</th>
                      <th className="px-4 py-3">Exam Name</th>
                      <th className="px-4 py-3">Student Score</th>
                      <th className="px-4 py-3">Max Marks</th>
                      <th className="px-4 py-3">No. of Negative Question</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {currentScores
                      .slice(indexOfFirstScore, indexOfLastScore)
                      .map((score, index) => (
                        <tr className="text-gray-700" key={index}>
                          <td className="px-4 py-3 border ">{index + 1}</td>
                          <td className="px-4 py-3 border ">
                            {score.examName}
                          </td>
                          <td className="px-4 py-3 border">{score.score}</td>
                          <td className="px-4 py-3 border">{score.maxMarks}</td>
                          <td className="px-4 py-3 border">
                            {score.NegativeCount}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : pastScores.length === 0 ? (
            <p>No past scores found.</p>
          ) : (
            <p>Loading...</p>
          )}
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-800"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-800"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </section>
        <div className="max-w-6xl">
    <h1 className="mb-4 text-xl font-bold">Offline Results</h1>

    {examScores.length > 0 ? (
        examScores.map((score, index) => (
            <div
                key={index}
                className="p-4 bg-[#1f1d5a] rounded-3xl shadow-md cursor-pointer hover:shadow-2xl "
                // onClick={() => handleCardClick(score._id)}
            >
                <h2 className="p-2 text-xl font-bold text-center bg-white rounded-[48px] ">
                    Student Score: {score.examScore}
                </h2>
            </div>
        ))
    ) : (
        <p>No exam scores available.</p>
    )}
</div>
      </div>
    </div>
  );
};
export default PastScoresTable;
