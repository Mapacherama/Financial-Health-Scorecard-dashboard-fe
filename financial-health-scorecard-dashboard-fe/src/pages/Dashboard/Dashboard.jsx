import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import Chart.js components
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [financialData, setFinancialData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
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
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
      console.log("Category:", category);
      console.log("Response Data:", response.data);
      setFinancialData(response.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary and trends data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await axios.get("http://127.0.0.1:5000/api/summary");
        setSummary(summaryResponse.data);

        const trendsResponse = await axios.get("http://127.0.0.1:5000/api/trends");
        setTrends(trendsResponse.data);

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

  return (
    <div className="dashboard-container" style={{ backgroundColor: "var(--background)", color: "var(--text)" }}>
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Filter Section */}
      <div className="filter-container">
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select start date"
            className="datepicker-input"
            style={{
              backgroundColor: "var(--inputBg)",
              color: "var(--text)",
              border: "1px solid var(--border)"
            }}
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Select end date"
            className="datepicker-input"
            style={{
              backgroundColor: "var(--inputBg)",
              color: "var(--text)",
              border: "1px solid var(--border)"
            }}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              backgroundColor: "var(--inputBg)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              padding: "0.5rem",
              borderRadius: "5px"
            }}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleFilter}
            className="filter-button"
            style={{
              backgroundColor: "var(--buttonBg)",
              color: "var(--text)",
              border: "1px solid var(--border)"
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container" style={{ backgroundColor: "var(--background)" }}>
        <div className="chart-wrapper" style={{ backgroundColor: "var(--inputBg)", border: "1px solid var(--border)" }}>
          <h3>Monthly Trends</h3>
          <Line data={trendsData} />
        </div>

        <div className="chart-wrapper" style={{ backgroundColor: "var(--inputBg)", border: "1px solid var(--border)" }}>
          <h3>Category Distribution</h3>
          <Pie data={categoryData} />
        </div>
      </div>

      {/* Display Filtered Financial Data */}
      <div className="financial-data-container" style={{ backgroundColor: "var(--inputBg)", border: "1px solid var(--border)" }}>
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