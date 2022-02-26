import { useState } from "react";
import Questions from "./components/questions/Questions";
import { questions } from "./data";
import Game from "./pages/Game/Game";

function App() {
  const [form, setForm] = useState({
    name: "",
    answers: [],
  })
  return (
    <div className="App">
      <Game questions={questions} setForm={setForm} form={form} />
    </div>
  );
}

export default App;
