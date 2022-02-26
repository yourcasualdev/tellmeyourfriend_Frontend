import React, { useState } from 'react'
import Questions from '../../components/questions/Questions';

const Game = ({ setForm, questions }) => {
    const [page, setPage] = useState("askname");
    const [state, setState] = useState({
        name: "",
        answers: [],
    })
    return (
        <div>
            {page === "askname" && <Askname state={state} setState={setState} setPage={setPage} />}
            {page === "askquestions" && <Questions state={state} setState={setState} setPage={setPage} questions={questions} />}
        </div>
    )
}

const Askname = ({ state, setState, setPage }) => {
    const [name, setName] = useState("")
    return (
        <div>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
            <button onClick={() => { setState({ name: name, answers: [] }); setPage("askquestions") }}>Start</button>
        </div>
    )
}

export default Game