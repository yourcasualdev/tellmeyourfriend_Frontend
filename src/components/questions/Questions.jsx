import { useState } from "react";
import axios from 'axios';

const Questions = ({ questions, name }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const form = {
      game: questions._id,
      name,
      answers: answers.map((answer, index) => ({
        answer: answer,
        isTrue: questions.questions[index].correctAnswer === answer ? true : false,
      })),
      score: answers.map((answer, index) => {
        if (questions.questions[index].correctAnswer === answer) {
          return 1;
        }
      }).filter((num) => { return num === 1 }).length,
    };
    await axios.post(`https://tellmeyourfriend.herokuapp.com/api/game/${questions._id}`, { body: form });
    window.location.href = (`http://localhost:3000/game/leaderboard/${questions._id}`);

  }

  const isSelected = (answer) => {
    return answers[currentQuestion] === answer ? "#75446f" : "#f0ad4e";
  };

  return (
    <div className="container">
      <div className="fw-bold">{questions.questions[currentQuestion].question}</div>

      <div className="col">
        <div className="row-md-6">
          <button
            className="btn btn-outline-dark"
            style={{ width: "150px", height: "150px", backgroundColor: isSelected(questions.questions[currentQuestion].answers[0]) }}
            onClick={() => handleAnswer(questions.questions[currentQuestion].answers[0])}
          >
            {questions.questions[currentQuestion].answers[0]}
          </button>
          <button
            className="btn btn-outline-dark p-5"
            style={{ width: "150px", height: "150px", backgroundColor: isSelected(questions.questions[currentQuestion].answers[1]) }}
            onClick={() => handleAnswer(questions.questions[currentQuestion].answers[1])}
          >
            {questions.questions[currentQuestion].answers[1]}
          </button>
        </div>
      </div>

      <div className="col">
        <div className="row-md-6">
          <button
            className="btn btn-outline-dark p-5"
            style={{ width: "150px", height: "150px", backgroundColor: isSelected(questions.questions[currentQuestion].answers[2]) }}
            onClick={() => handleAnswer(questions.questions[currentQuestion].answers[2])}
          >
            {questions.questions[currentQuestion].answers[2]}
          </button>
          <button
            className="btn btn-outline-dark p-5"
            style={{ width: "150px", height: "150px", backgroundColor: isSelected(questions.questions[currentQuestion].answers[3]) }}
            onClick={() => handleAnswer(questions.questions[currentQuestion].answers[3])}
          >
            {questions.questions[currentQuestion].answers[3]}
          </button>
        </div>
      </div>

      <div className="col">
        <div className="row-md-6">
          <button
            className="btn btn-outline-dark p-5"
            style={{ width: "150px", height: "150px", backgroundColor: isSelected(questions.questions[currentQuestion].answers[4]) }}
            onClick={() => handleAnswer(questions.questions[currentQuestion].answers[4])}
          >
            {questions.questions[currentQuestion].answers[4]}
          </button>
          <button
            className="btn btn-outline-dark p-5"
            style={{ width: "150px", height: "150px", backgroundColor: isSelected(questions.questions[currentQuestion].answers[5]) }}
            onClick={() => handleAnswer(questions.questions[currentQuestion].answers[5])}
          >
            {questions.questions[currentQuestion].answers[5]}
          </button>
        </div>
      </div>

      <button className="btn btn-light" onClick={() => { handlePrevQuestion(); }}>
        Önceki
      </button>
      <button className="btn btn-dark" onClick={() => { handleNextQuestion(); }}>
        Sonraki
      </button>
      {currentQuestion === questions.questions.length - 1 && (
        <button className="btn btn-danger" onClick={() => { handleSubmit(); }}>
          Gönder
        </button>
      )}
    </div>
  )
}

const Button = ({ name, handleAnswer }) => {
  return (
    <button className="btn btn-warning px-5 mt-2" onClick={() => handleAnswer(name)}>{name}</button>
  )
}
export default Questions