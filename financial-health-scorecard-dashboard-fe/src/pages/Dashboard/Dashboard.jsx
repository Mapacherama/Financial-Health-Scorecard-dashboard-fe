import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styling/dashboard.css"; // Import CSS styles

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await axios.get("http://127.0.0.1:5000/api/summary");
        setSummary(summaryResponse.data);

        const trendsResponse = await axios.get("http://127.0.0.1:5000/api/trends");
        setTrends(trendsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from the API", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Display Financial Summary */}
      <div className="summary-card">
        <div className="summary-item">
          <h3>Total Income</h3>
          <p>${summary.total_income.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Total Expenses</h3>
          <p>${summary.total_expenses.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Net Balance</h3>
          <p>${summary.net_balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Display Monthly Trends */}
      <div className="trends-container">
        <h3>Monthly Trends</h3>
        <ul className="trends-list">
          {trends.map((trend, index) => (
            <li key={index}>
              <span className="month">{trend.month}</span>
              <span className="total">${trend.total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
