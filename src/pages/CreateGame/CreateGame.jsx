import { useState } from 'react'

const CreateGame = () => {
    const [form, setForm] = useState({
        name: '',
        questions: [],
    });
    const [sessionURL, setsessionURL] = useState('');




    return (
        <div>
            <ShowQuestions form={form} />
            <AddQuestion form={form} setForm={setForm} />
            <Submit form={form} setsessionURL={setsessionURL} />
            {sessionURL ? showUrl(sessionURL) : null}

        </div>
    )
}

const AddQuestion = ({ form, setForm }) => {
    return (
        <div>
            <div className="game-title">
                <h1>Yeni bir Oyun Oluştur</h1>
            </div>
            <div className="name-input">
                <label>Adın Nedir ?</label>
                <input type="text" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
            </div>
            <form>
                <div className="question-input">
                    <label>Soru</label>
                    <input type="text" id='question' />
                </div>
                <div className="answer-input">
                    <div className='answer-input-div'>
                        <label>Cevap 1</label>
                        <input type="text" id='answer0' />
                    </div>
                    <div className='answer-input-div'>
                        <label>Cevap 2</label>
                        <input type="text" id='answer1' />
                    </div>
                    <div className='answer-input-div'>
                        <label>Cevap 3</label>
                        <input type="text" id='answer2' />
                    </div>
                    <div className='answer-input-div'>
                        <label>Cevap 4</label>
                        <input type="text" id='answer3' />
                    </div>
                    <div className='answer-input-div'>
                        <label>Cevap 5</label>
                        <input type="text" id='answer4' />
                    </div>
                    <div className='answer-input-div'>
                        <label>Cevap 6</label>
                        <input type="text" id='answer5' />
                    </div>
                </div>
                <div className="correctAnswerInput">
                    <label>Doğru Cevap</label>
                    <input type="text" id='correctAnswer' />
                </div>
                <div className="addQuestionButton">
                    <button onClick={(e) => {
                        e.preventDefault();
                        setForm({
                            ...form, questions: [...form.questions, {
                                question: document.getElementById('question').value,
                                answers: [
                                    document.getElementById('answer0').value,
                                    document.getElementById('answer1').value,
                                    document.getElementById('answer2').value,
                                    document.getElementById('answer3').value,
                                    document.getElementById('answer4').value,
                                    document.getElementById('answer5').value,
                                ],
                                correctAnswer: document.getElementById('correctAnswer').value,
                            }]
                        }

                        )
                    }

                    }>Add Question</button>
                </div>
            </form>
        </div>
    )
}

const ShowQuestions = ({ form }) => {
    return (
        <div>
            <div className="game-name">
                <h1>Senin Adın : {form.name}</h1>
            </div>
            {form.questions.map((question, index) => {
                return (
                    <div key={index}>
                        <h1>{question.question}</h1>
                        <ul>
                            {question.answers.map((answer, index) => {
                                return (
                                    <li key={index}>{answer}</li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

//post to api
const Submit = ({ form, setsessionURL }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/game/newgame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name,
                questions: form.questions
            })

        });
        const URL = `http://localhost:3000/game/${await response.json()}`;
        setsessionURL(URL);
        console.log(URL)
    }

    return (
        <div className='submit-button-div'>
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    )
}

const showUrl = (sessionURL) => {
    return (
        <div>
            <a href={sessionURL}>{sessionURL}</a>
            <button onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(sessionURL);
            }} >
                Copy to Clipboard
            </button>
        </div>
    )
}






export default CreateGame