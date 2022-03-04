import { useState } from "react";
import './questions.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";

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
    await axios.post(`http://localhost:5000/api/game/${questions._id}`, { body: form });
    window.location.href = (`http://localhost:3000/game/leaderboard/${questions._id}`);

  }

  const isSelected = (answer) => {
    return answers[currentQuestion] === answer ? "#75446f" : "#50394C";
  };

  return (
    <div className="question-wrapper">
      <div className="question-title">{questions.questions[currentQuestion].question}</div>
      <div className="question-answers">
        {questions.questions[currentQuestion].answers.map((answer) => (
          <button style={{ backgroundColor: isSelected(answer), color: "white" }} className="question-answer" onClick={() => {
            handleAnswer(answer);

          }}>
            {answer}
          </button>
        ))}
        { }
      </div>
      <button className="question-prev" onClick={() => { handlePrevQuestion(); }}>
        Prev
      </button>
      <button className="question-newxt" onClick={() => { handleNextQuestion(); }}>
        Next
      </button>
      {currentQuestion === questions.questions.length - 1 && (
        <button className="question-submit" onClick={() => { handleSubmit(); }}>
          Submit
        </button>
      )}
    </div>
  )
}

export default Questions