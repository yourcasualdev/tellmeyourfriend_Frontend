import { useState, useEffect } from "react";
import Game from "./pages/Game/Game";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateGame from "./pages/CreateGame/CreateGame";


function App() {



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:slug" element={<Game />} />
        <Route path="/game/create" element={<CreateGame />} />

      </Routes>

    </div>
  );
}

export default App;
