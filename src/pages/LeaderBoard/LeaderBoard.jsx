import React from 'react'
import { useState, useEffect } from 'react'

const LeaderBoard = () => {
    //fetch data for leaderboard
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setİsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const slug = window.location.href.split('/')[5]
            const url = `http://localhost:5000/api/game/${slug}`;
            const response = await fetch(url);
            const data = await response.json();
            const sortedLeaderboard = data.leaderboard.sort((a, b) => b.score - a.score)
            setLeaderboard(data);
            console.log(data);
        }
        try {
            fetchData();
            setİsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const sortByScore = (arr) => {
        return arr.leaderboard.sort((a, b) => {
            return b.score - a.score;
        });
    }

    return (
        // sort leaderboard by score and show
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && leaderboard.leaderboard && leaderboard.leaderboard.map((item, index) => {
                return (
                    <div key={index}>
                        <h2>{item.name}</h2>
                        <h3>{item.score}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default LeaderBoard