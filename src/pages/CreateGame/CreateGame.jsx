import { useState } from 'react'
const CreateGame = () => {
    const [form, setForm] = useState({
        name: '',
        questions: [],
    });
    const [sessionURL, setsessionURL] = useState('');




    return (
        <div>
            {!sessionURL && <AddQuestion form={form} setForm={setForm} />}
            {!sessionURL && <Submit form={form} setsessionURL={setsessionURL} />}
            {!sessionURL && <ShowQuestions form={form} />}
        </div>
    )
}

const AddQuestion = ({ form, setForm }) => {
    return (
        <div className='container'>

            <div className="game-title">
                <h1>Yeni bir Oyun Oluştur</h1>
            </div>
            <div className="name-input">
                <label>Adın Nedir ?</label>
                <input type="text" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
            </div>
            <form className='question-form'>
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
                        //look if true answer is in answers
                        const answers = [...document.querySelectorAll('#answer0, #answer1, #answer2, #answer3, #answer4, #answer5')];
                        const correctAnswer = document.querySelector('#correctAnswer').value;
                        const answersArray = answers.map(answer => answer.value);
                        if (answersArray.includes(correctAnswer)) {
                            //look if not more than 6 answers
                            if (form.questions.length < 6) {
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
                                //empty all inputs
                                document.getElementById('question').value = '';
                                document.getElementById('answer0').value = '';
                                document.getElementById('answer1').value = '';
                                document.getElementById('answer2').value = '';
                                document.getElementById('answer3').value = '';
                                document.getElementById('answer4').value = '';
                                document.getElementById('answer5').value = '';
                                document.getElementById('correctAnswer').value = '';
                            } else {
                                alert('En fazla 6 soru ekleyebilirsiniz')
                            }
                        } else {
                            alert('Doğru cevap doğru cevap olarak seçilmelidir')
                        }
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

    //check if questions 4 long

    const handleSubmit = async (e) => {
        if (form.questions.length === 6) {
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
            //add session url to local storage
            localStorage.setItem('id', await response.json());
            window.location.href = '/';
        }
        else {
            alert("6 Soru Girmelisin")
        }
    }

    return (
        <div className='submit-button-div'>
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    )
}









export default CreateGame