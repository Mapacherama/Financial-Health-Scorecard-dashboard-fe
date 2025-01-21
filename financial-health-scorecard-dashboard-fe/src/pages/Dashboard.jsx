import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch summary data
        const summaryResponse = await axios.get("http://127.0.0.1:5000/api/summary");
        setSummary(summaryResponse.data);

        // Fetch trends data
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
    <div>
      <h2>Dashboard</h2>

      {/* Display Summary */}
      <div style={{ marginBottom: "2rem" }}>
        <h3>Financial Summary</h3>
        <p>Total Income: ${summary.total_income.toFixed(2)}</p>
        <p>Total Expenses: ${summary.total_expenses.toFixed(2)}</p>
        <p>Net Balance: ${summary.net_balance.toFixed(2)}</p>
      </div>

      {/* Display Trends */}
      <div>
        <h3>Monthly Trends</h3>
        <ul>
          {trends.map((trend, index) => (
            <li key={index}>
              {trend.month}: ${trend.total.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;