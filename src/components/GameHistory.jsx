// src/components/GameHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Typography } from "antd";
import "../styles/gameHistory.css";

const GameHistory = () => {
  const [gameHistory, setGamehistory] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/games");
        setGamehistory(response.data);
      } catch (error) {
        console.error("Error fetching game history:", error);
      }
    };
    fetchGames();
  }, []);

  const columns = [
    {
      title: "Player1's Name",
      dataIndex: "player1",
      key: "player1",
    },
    {
      title: "Player2's Name",
      dataIndex: "player2",
      key: "player2",
    },
    {
      title: "Player1's Score",
      dataIndex: ["score", "player1"],
      key: "player1_score",
    },
    {
      title: "Player2's Score",
      dataIndex: ["score", "player2"],
      key: "player2_score",
    },
    {
      title: "Winner",
      dataIndex: "winner",
      key: "winner",
    },
  ];

  return (
    <div className="game-history">
      <div className="game-history-heading">Game History</div>
      <br />
      <Table
        columns={columns}
        dataSource={gameHistory}
        pagination={false}
        rowKey={(record) => record.id}
        scroll={{ x: 800, y: 400 }}
      />
    </div>
  );
};

export default GameHistory;
