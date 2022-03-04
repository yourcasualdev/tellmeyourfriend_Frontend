import Game from "./pages/Game/Game";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateGame from "./pages/CreateGame/CreateGame";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import Header from "./components/Header/Header";



function App() {



  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:slug" element={<Game />} />
        <Route path="/game/leaderboard/:slug" element={<LeaderBoard />} />
        <Route path="/game/create" element={<CreateGame />} />
      </Routes>

    </div>
  );
}

export default App;
