import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Row, Col } from "antd";
import "../styles/gameForm.css";

const GameForm = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const handlePlayerSubmit = () => {
    sessionStorage.setItem("player1", player1);
    sessionStorage.setItem("player2", player2);

    navigate("/game");
  };

  return (
    <div className="game-form-container">
      <Form className="game-form" onFinish={handlePlayerSubmit}>
        <h2 className="game-form-heading">Welcome!</h2>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Player1's Name"
              name="player1"
              rules={[{ required: true, message: "Enter name" }]}
            >
              <Input
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Player2's Name"
              name="player2"
              rules={[{ required: true, message: "Enter name" }]}
            >
              <Input
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" className="form-submit-btn">
          Start Game
        </Button>
      </Form>
    </div>
  );
};

export default GameForm;
