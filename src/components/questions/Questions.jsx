import { useState } from "react";
import './questions.css'

const Questions = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log(answers);
  };

  const isSelected = (answer) => {
    return answers[currentQuestion] === answer ? "blue" : "green";
  };

  return (
    <div className="question-wrapper">
      <div className="question-id">{questions[currentQuestion].id}</div>
      <div className="question-title">{questions[currentQuestion].question}</div>
      <div className="question-answers">
        {questions[currentQuestion].options.map((answer) => (
          <button style={{ backgroundColor: isSelected(answer) }} className="question-answer" onClick={() => {
            handleAnswer(answer);

          }}>
            {answer}
          </button>
        ))}
      </div>
      <button className="question-prev" onClick={() => { handlePrevQuestion(); }}>
        Prev
      </button>
      <button className="question-newxt" onClick={() => { handleNextQuestion(); }}>
        Next
      </button>
      {
        questions[currentQuestion].id === questions.length && (
          <button onClick={handleSubmit}>Submit</button>
        )
      }
    </div>
  )
}

export default Questions