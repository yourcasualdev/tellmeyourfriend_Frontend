import React, { useState, useEffect } from 'react'
import Questions from '../../components/questions/Questions';

const Game = () => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState("askname");
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const slug = window.location.href.split('/')[4]
            const url = `http://localhost:5000/api/game/${slug}`;
            const response = await fetch(url);
            const data = await response.json();
            setQuestions(data);
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            {page === "askname" && <Askname name={name} setName={setName} setPage={setPage} />}
            {page === "askquestions" && <Questions name={name} setPage={setPage} questions={questions} />}
        </div>
    )
}

const Askname = ({ name, setName, setPage }) => {
    return (
        <div>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
            <button onClick={() => { setPage("askquestions") }}>Start</button>
        </div>
    )
}

export default Game