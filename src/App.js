import { useState, useEffect } from "react";
import Game from "./pages/Game/Game";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateGame from "./pages/CreateGame/CreateGame";


function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const slug = window.location.href.split('/')[4]
      const url = `http://localhost:5000/api/game/${slug}`;
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data);
      console.log(data);
    }
    fetchData();
  }, []);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:slug" element={<Game questions={questions} />} />
        <Route path="/game/create" element={<CreateGame />} />

      </Routes>

    </div>
  );
}

export default App;
