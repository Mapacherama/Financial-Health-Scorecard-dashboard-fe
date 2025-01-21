import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./dashboard.css";

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

        const financialResponse = await axios.get("http://127.0.0.1:5000/api/financial_data");
        setFinancialData(financialResponse.data);

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

      {/* Filter Section */}
      {/* Filter Section */}
      <div className="filter-container">
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Select end date"
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <button onClick={handleFilter} className="filter-button">
            Apply Filters
          </button>
        </div>
      </div>


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

      {/* Display Filtered Financial Data */}
      <div className="financial-data-container">
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