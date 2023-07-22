import React, { useState, useEffect } from 'react';

const PastScoresTable = () => {
    const [pastScores, setPastScores] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Past Scores</h1>
            <div className="flex justify-center">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr>
                            <th className="border p-2">SN</th>
                            <th className="border p-2">Exam Name</th>
                            <th className="border p-2">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastScores.map((score, index) => (
                            <tr key={index}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{score.examName}</td>
                                <td className="border p-2">{score.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default PastScoresTable;
