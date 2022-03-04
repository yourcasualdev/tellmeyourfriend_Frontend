import { useState } from 'react'
const CreateGame = () => {
    const [form, setForm] = useState({
        name: '',
        questions: [],
    });
    const [sessionURL, setsessionURL] = useState('');




    return (
        <div>
            {!sessionURL && <AddQuestion sessionURL={sessionURL} setsessionURL={setsessionURL} form={form} setForm={setForm} />}
            {!sessionURL && <ShowQuestions form={form} />}
        </div>
    )
}

const AddQuestion = ({ sessionURL, setsessionURL, form, setForm }) => {
    return (
        <div className='container'>

            <div className="game-title">
                <h1 className='fw-bold'>Yeni bir Oyun Oluştur</h1>
                <p className='text-muted'>Aşağıdan 6 soru ekle sonra "Oluştur" butonuyla oynamaya başla!</p>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Adın Nedir ?</label>
                </div>
                <div className="col">
                    <input type="text" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
                </div>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Soru :</label>
                </div>
                <div className="col">
                    <input type="text" id='question' />
                </div>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Cevap 1</label>
                </div>
                <div className="col">
                    <input type="text" id='answer0' />
                </div>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Cevap 2</label>
                </div>
                <div className="col">
                    <input type="text" id='answer1' />
                </div>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Cevap 3</label>
                </div>
                <div className="col">
                    <input type="text" id='answer2' />
                </div>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Cevap 4</label>
                </div>
                <div className='col'>
                    <input type="text" id='answer3' />
                </div>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Cevap 5</label>
                </div>
                <div className="col">
                    <input type="text" id='answer4' />
                </div>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Cevap 6</label>
                </div>
                <div className="col">
                    <input type="text" id='answer5' />
                </div>
            </div>

            <div className="row input-group mb-3">
                <div className="col">
                    <label>Doğru Cevap</label>
                </div>
                <div className="col">
                    <input type="text" id='correctAnswer' />
                </div>
            </div>

            <div className="addQuestionButton">
                <button className='btn btn-primary btn-lg mt-2' onClick={(e) => {
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

                }>Soru Ekle</button>
                {!sessionURL && <Submit form={form} setsessionURL={setsessionURL} />}
            </div>
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
            const response = await fetch('https://tellmeyourfriend.herokuapp.com/api/game/newgame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: form.name,
                    questions: form.questions
                })

            });
            const id = await response.json();
            const URL = "a"
            setsessionURL(URL);
            await localStorage.setItem('id', id);
            window.location.href = 'http://localhost:3000';
        }
        else {
            alert("6 Soru Girmelisin")
        }
    }

    return (
        <div>
            <button className='btn btn-warning px-5 mt-2' onClick={(e) => handleSubmit(e)}>Oluştur!</button>
        </div>
    )
}









export default CreateGame