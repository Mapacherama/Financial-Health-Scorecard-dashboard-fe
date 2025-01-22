import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import Chart.js components
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [financialData, setFinancialData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [topTransactions, setTopTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch filtered data
  const handleFilter = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/financial_data", {
        params: {
          start_date: startDate ? startDate.toISOString().split("T")[0] : null,
          end_date: endDate ? endDate.toISOString().split("T")[0] : null,
          category,
        },
      });
      setFinancialData(response.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary, trends, and top transactions data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await axios.get("http://127.0.0.1:5000/api/summary");
        setSummary(summaryResponse.data);

        const trendsResponse = await axios.get("http://127.0.0.1:5000/api/trends");
        setTrends(trendsResponse.data);

        const topTransactionsResponse = await axios.get("http://127.0.0.1:5000/api/top_transactions");
        setTopTransactions(topTransactionsResponse.data);

        handleFilter();

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from the API", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const trendsData = {
    labels: trends.map((trend) => trend.month), // X-axis labels
    datasets: [
      {
        label: "Monthly Total ($)",
        data: trends.map((trend) => trend.total), // Y-axis data
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [
          summary?.total_income.toFixed(2) || 0,
          Math.abs(summary?.total_expenses.toFixed(2) || 0),
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const topTransactionsData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount ($)",
        data: [
          topTransactions?.top_income?.amount || 0,
          Math.abs(topTransactions?.top_expense?.amount || 0),
        ],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#EF5350"],
      },
    ],
  };

  return (
    <div
      className="dashboard-container"
      style={{ backgroundColor: "var(--background)", color: "var(--text)" }}
    >
      <h2 className="dashboard-title">Dashboard</h2>
  
      {/* Charts */}
      <div
        className="charts-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "20px",
          backgroundColor: "var(--background)",
        }}
      >
        <div
          className="chart-wrapper"
          style={{
            flex: "1 1 calc(33.33% - 20px)", // Makes each chart take 1/3 of the row, minus gap
            backgroundColor: "var(--inputBg)",
            border: "1px solid var(--border)",
            padding: "20px",
          }}
        >
          <h3>Monthly Trends</h3>
          <Line data={trendsData} />
        </div>
  
        <div
          className="chart-wrapper"
          style={{
            flex: "1 1 calc(33.33% - 20px)",
            backgroundColor: "var(--inputBg)",
            border: "1px solid var(--border)",
            padding: "20px",
          }}
        >
          <h3>Category Distribution</h3>
          <Pie data={categoryData} />
        </div>
  
        <div
          className="chart-wrapper"
          style={{
            flex: "1 1 calc(33.33% - 20px)",
            backgroundColor: "var(--inputBg)",
            border: "1px solid var(--border)",
            padding: "20px",
          }}
        >
          <h3>Top Transactions</h3>
          {topTransactions ? (
            <Bar data={topTransactionsData} />
          ) : (
            <p>Loading Top Transactions...</p>
          )}
        </div>
      </div>
  
      {/* Display Filtered Financial Data */}
      <div
        className="financial-data-container"
        style={{
          backgroundColor: "var(--inputBg)",
          border: "1px solid var(--border)",
          padding: "20px",
          marginTop: "20px", // Adds some space between the charts and this section
        }}
      >
        <h3>Filtered Financial Data</h3>
        <ul className="financial-data-list">
          {financialData.map((item, index) => (
            <li key={index}>
              <span>{item.date} - </span>
              <span>{item.category} - </span>
              <span>${item.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );  
};

export default Dashboard;
