import React from "react";
import ScoreCard from "../components/ScoreCard";

const Dashboard = () => {
  const financialMetrics = [
    { title: "Savings", score: 85 },
    { title: "Debt-to-Income Ratio", score: 72 },
    { title: "Emergency Fund", score: 90 },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        {financialMetrics.map((metric, index) => (
          <ScoreCard key={index} title={metric.title} score={metric.score} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
