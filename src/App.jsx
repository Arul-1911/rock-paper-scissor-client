import { useState } from "react";
import "./App.css";
import GameForm from "./components/GameForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./components/GamePage";
import GameHistory from "./components/GameHistory";

function App() {
  const [players, setPlayers] = useState({ player1: "", player2: "" });

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GameForm setPlayers={setPlayers} />} />
          <Route path="/game" element={<GamePage players={players} />} />
          <Route path="/history" element={<GameHistory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
