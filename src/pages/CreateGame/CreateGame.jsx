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
            <div>
                {sessionURL && <a href={sessionURL}>{sessionURL}</a>}
                {/* make button for copy to clipboard */}
                <button onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(sessionURL);
                }} >
                    Copy to Clipboard
                </button>
            </div>

        </div>
    )
}

const AddQuestion = ({ form, setForm }) => {
    return (
        <div>
            <input type="text" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
            <form>
                <input type="text" id='question' />
                <input type="text" id='answer0' />
                <input type="text" id='answer1' />
                <input type="text" id='answer2' />
                <input type="text" id='answer3' />
                <input type="text" id='answer4' />
                <input type="text" id='answer5' />
                <input type="text" id='correctAnswer' />
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


            </form>
        </div>
    )
}

const ShowQuestions = ({ form }) => {
    return (
        <div>
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
        <div>
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    )
}





export default CreateGame