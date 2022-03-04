import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Questions from '../../components/questions/Questions';

const Game = () => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState("askname");
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const slug = window.location.href.split('/')[4]
            const url = `https://tellmeyourfriend.herokuapp.com/api/game/${slug}`;
            const response = await fetch(url);
            const data = await response.json();
            setQuestions(data);
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <div style={{ marginTop: "120px", textAlign: 'center' }}>
            <h1 className='fw-bold'>{questions.name} Adlı oyuncunun oyunu</h1>
            <p className='text-muted'>Soruları cevapla Ve gönder</p>
            {page === "askname" && <Askname name={name} setName={setName} setPage={setPage} />}
            {page === "askquestions" && <Questions name={name} setPage={setPage} questions={questions} />}
        </div>
    )
}

const Askname = ({ name, setName, setPage }) => {
    return (
        <div className='container'>
            <h1 className='fw-bold'>Merhaba Adın?</h1>
            <div className="row">
                <input className='input-group-text mt-2' value={name} onChange={(e) => { setName(e.target.value) }} />
                <button className='btn btn-warning mt-2' onClick={() => { setPage("askquestions") }} > Başla!</button>
            </div>
        </div>
    )
}

export default Game