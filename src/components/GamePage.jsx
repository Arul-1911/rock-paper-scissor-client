import React, { useEffect, useState } from "react";
import "../styles/gamePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomModal from "./Modal";

const GamePage = () => {
  const player1 = sessionStorage.getItem("player1") || "";
  const player2 = sessionStorage.getItem("player2") || "";
  const [move1, setMove1] = useState("");
  const [move2, setMove2] = useState("");
  const [currentRound, setCurrentRound] = useState(1);
  const [winner, setWinner] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [score, setScores] = useState({ player1: 0, player2: 0 });
  const total_rounds = 6;

  const navigate = useNavigate();

  const determineWinner = (move1, move2) => {
    if (move1 === move2) return "Tie";
    if (
      (move1 === "stone" && move2 === "scissors") ||
      (move1 === "scissors" && move2 === "paper") ||
      (move1 === "paper" && move2 === "stone")
    ) {
      return player1;
    }
    return player2;
  };

  // Handle move selection for both players
  const handleMoveSelection = (move) => {
    if (!move1) {
      setMove1(move);
    } else {
      setMove2(move);
    }
  };

  useEffect(() => {
    if (move1 && move2) {
      const currentWinner = determineWinner(move1, move2);
      setWinner(currentWinner);

      if (currentWinner === player1) {
        setScores((prevScores) => ({
          ...prevScores,
          player1: prevScores.player1 + 1,
        }));
      } else if (currentWinner === player2) {
        setScores((prevScores) => ({
          ...prevScores,
          player2: prevScores.player2 + 1,
        }));
      }

      setShowModal(true);
    }
  }, [move1, move2]);

  const handleCloseModal = () => {
    setShowModal(false);
    setMove1("");
    setMove2("");
    setCurrentRound((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentRound === total_rounds) {
      const gameData = {
        player1,
        player2,
        score,
        winner:
          score.player1 > score.player2
            ? player1
            : score.player1 < score.player2
            ? player2
            : "Tie",
      };

      // Sending data to the backend
      axios
        .post(
          "https://rock-paper-scissor-server.onrender.com/api/games",
          gameData
        )
        .then((res) => {
          console.log(res.data);
          navigate("/history");
        })
        .catch((err) => {
          console.error("Error posting data", err);
        });
    }
  }, [currentRound, score, player1, player2, navigate]);

  return (
    <div className="game-page-main-container">
      <div className="game-page">
        <div className="game-page-header">
          <div>Rock Paper Scissors with Compose </div>
        </div>
        <div className="game-page-sub-header">
          <div style={{ color: "red" }}>Round: {currentRound}</div>
          <div style={{ color: "orangered" }}>
            Now :{move1 === "" ? ` ${player1}'s Turn` : ` ${player2}'s Turn`}
          </div>
        </div>
        <div className="game-btn-container">
          <button
            onClick={() => handleMoveSelection("stone")}
            className="game-btn"
          >
            ✊
          </button>
          <button
            onClick={() => handleMoveSelection("paper")}
            className="game-btn"
          >
            🫱
          </button>
          <button
            onClick={() => handleMoveSelection("scissors")}
            className="game-btn"
          >
            ✌️
          </button>
        </div>
        <p className="game-page-text">
          Choose your move, rock paper or scissors?
        </p>
      </div>

      {showModal && (
        <CustomModal
          winner={winner}
          onClose={handleCloseModal}
          move1={move1}
          move2={move2}
        />
      )}
    </div>
  );
};

export default GamePage;
