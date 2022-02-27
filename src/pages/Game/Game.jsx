import React, { useState } from 'react'
import Questions from '../../components/questions/Questions';

const Game = ({ questions }) => {
    const [page, setPage] = useState("askname");
    const [name, setName] = useState("");
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