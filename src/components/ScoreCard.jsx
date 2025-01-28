import React from "react";

const ScoreCard = ({ title, score }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", margin: "1rem" }}>
      <h3>{title}</h3>
      <p>Score: {score}</p>
    </div>
  );
};

export default ScoreCard;
