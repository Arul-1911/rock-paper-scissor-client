import React from "react";
import { Modal as AntModal } from "antd";

const CustomModal = ({ winner, onClose, move1, move2 }) => {
  return (
    <AntModal
      title="Round Result"
      open={true}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      className="custom-modal"
    >
      <p
        style={{ color: "red" }}
      >{`Player 1 (${move1})  vs  Player 2 (${move2})`}</p>
      <h3 style={{ color: "forestgreen" }}>
        {winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`}
      </h3>
    </AntModal>
  );
};

export default CustomModal;
