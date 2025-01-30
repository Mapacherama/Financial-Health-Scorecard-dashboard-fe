import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [forecast, setForecast] = useState([]);
  const [recurringTransactions, setRecurringTransactions] = useState([]);
  const [savingsRate, setSavingsRate] = useState(null);
  const [growthData, setGrowthData] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch filtered data
  const handleFilter = async () => {
    setLoading(true);
    setError(null);
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
      setError("Failed to fetch financial data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary, trends, top transactions, forecast, recurring transactions, and savings rate data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const summaryResponse = await axios.get("http://127.0.0.1:5000/api/summary");
        setSummary(summaryResponse.data);

        const trendsResponse = await axios.get("http://127.0.0.1:5000/api/trends");
        setTrends(trendsResponse.data);

        const topTransactionsResponse = await axios.get("http://127.0.0.1:5000/api/top_transactions");
        setTopTransactions(topTransactionsResponse.data);

        const forecastResponse = await axios.get("http://127.0.0.1:5000/api/forecast");
        setForecast(forecastResponse.data);

        const recurringResponse = await axios.get("http://127.0.0.1:5000/api/recurring_transactions");
        setRecurringTransactions(recurringResponse.data);

        const savingsRateResponse = await axios.get("http://127.0.0.1:5000/api/savings_rate");
        setSavingsRate(savingsRateResponse.data);

        const growthResponse = await axios.post("http://127.0.0.1:5000/api/compound_growth", {}, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setGrowthData(growthResponse.data.saved_growths);

        const investmentResponse = await axios.get("http://127.0.0.1:5000/api/investment_portfolio");
        setInvestments(investmentResponse.data.investments);

        handleFilter();
      } catch (error) {
        console.error("Error fetching data from the API", error);
        setError("Failed to load dashboard data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const forecastedData = {
    labels: [
      ...trends.map((trend) => trend.month), // Historical months
      ...forecast.map((_, index) => `Month ${index + 1}`), // Forecasted months
    ],
    datasets: [
      {
        label: "Historical Data",
        data: trends.map((trend) => trend.total), // Historical data
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
      {
        label: "Forecasted Data",
        data: [
          ...new Array(trends.length).fill(null), // Fill historical data with null
          ...forecast.map((f) => f.predicted_total), // Forecasted data
        ],
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderDash: [5, 5], // Dashed line for forecast
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [
          summary?.total_income?.toFixed(2) || 0,
          Math.abs(summary?.total_expenses?.toFixed(2) || 0),
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

  const recurringTransactionsData = {
    labels: recurringTransactions.map((item) => item.category),
    datasets: [
      {
        label: "Occurrences",
        data: recurringTransactions.map((item) => item.occurrences),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Total Amount ($)",
        data: recurringTransactions.map((item) => item.total),
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  const investmentCategoryData = {
    labels: investments.map((investment) => investment.category),
    datasets: [
      {
        label: "Investment Amount ($)",
        data: investments.map((investment) => investment.amount),
        backgroundColor: ["#36A2EB", "#FF6384", "#4CAF50", "#FFC107"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#4CAF50", "#FFC107"],
      },
    ],
  };

  const growthChartData = {
    labels: growthData.length > 0 ? growthData.map((item) => `Year ${item.year}`) : ["No Data"],
    datasets: [
      {
        label: "Compound Growth ($)",
        data: growthData.length > 0 ? growthData.map((item) => item.value) : [0],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div
      className="dashboard-container"
      style={{ backgroundColor: "var(--background)", color: "var(--text)" }}
    >
      <h2 className="dashboard-title">Dashboard</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
      )}

      {loading ? (
        <Skeleton count={5} height={30} />
      ) : (
        <>
          {/* Savings Rate Widget */}
          <div
            className="savings-rate-widget"
            style={{
              backgroundColor: "var(--inputBg)",
              border: "1px solid var(--border)",
              padding: "20px",
              marginBottom: "20px",
              textAlign: "center",
              borderRadius: "8px",
              width: "50%",
              margin: "0 auto",
            }}
          >
            <h3>Savings Rate</h3>
            {savingsRate ? (
              <p
                style={{
                  color: savingsRate.savings_rate >= 20 ? "green" : "red",
                  fontSize: "1.5em",
                  fontWeight: "bold",
                }}
              >
                {savingsRate.savings_rate.toFixed(2)}%
              </p>
            ) : (
              <p>No data available for savings rate.</p>
            )}
          </div>

          {/* Trends Chart */}
          <div
            className="chart-wrapper"
            style={{
              backgroundColor: "var(--inputBg)",
              border: "1px solid var(--border)",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
              borderRadius: "8px"
            }}
          >
            <h3>Monthly Trends</h3>
            {trends.length > 0 ? (
              <Line
                data={trendsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: {
                        color: "var(--text)"
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: { color: "var(--text)" },
                      grid: { color: "var(--border)" }
                    },
                    x: {
                      ticks: { color: "var(--text)" },
                      grid: { color: "var(--border)" }
                    }
                  }
                }}
              />
            ) : (
              <p>No trend data available</p>
            )}
          </div>

          {/* Forecasted Financial Trends Chart */}
          <div
            className="chart-wrapper"
            style={{
              backgroundColor: "var(--inputBg)",
              border: "1px solid var(--border)",
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <h3>Forecasted Financial Trends</h3>
            {trends.length > 0 ? (
              <Line data={forecastedData} />
            ) : (
              <p>No data available for trends.</p>
            )}
          </div>

          {/* Charts */}
          <div
            className="charts-container"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(2, 1fr)`,
              gap: "20px",
            }}
          >
            <div
              className="chart-wrapper"
              style={{
                backgroundColor: "var(--inputBg)",
                border: "1px solid var(--border)",
                padding: "20px",
              }}
            >
              <h3>Category Distribution</h3>
              {summary ? (
                <Pie data={categoryData} />
              ) : (
                <p>No summary data available.</p>
              )}
            </div>

            <div
              className="chart-wrapper"
              style={{
                backgroundColor: "var(--inputBg)",
                border: "1px solid var(--border)",
                padding: "20px",
              }}
            >
              <h3>Top Transactions</h3>
              {topTransactions && (topTransactions.top_income || topTransactions.top_expense) ? (
                <Bar data={topTransactionsData} />
              ) : (
                <p>No data available for top transactions.</p>
              )}
            </div>

            <div
              className="chart-wrapper"
              style={{
                backgroundColor: "var(--inputBg)",
                border: "1px solid var(--border)",
                padding: "20px",
                gridColumn: "1 / -1",
              }}
            >
              <h3>Recurring Transactions</h3>
              {recurringTransactions.length > 0 ? (
                <Bar data={recurringTransactionsData} />
              ) : (
                <p>No data available for recurring transactions.</p>
              )}
            </div>
            <div
              className="chart-wrapper"
              style={{
                backgroundColor: "var(--inputBg)",
                border: "1px solid var(--border)",
                padding: "20px",
              }}
            >
              <h3>Investment Portfolio Distribution</h3>
              {investments.length > 0 ? <Pie data={investmentCategoryData} /> : <p>No investment data available.</p>}
            </div>

            {/* Compound Growth Chart */}
            <div className="chart-wrapper" style={{ backgroundColor: "var(--inputBg)", border: "1px solid var(--border)", padding: "20px", marginBottom: "20px", borderRadius: "8px" }}>
              <h3>Compound Growth Over Time</h3>
              {growthData.length > 0 ? (
                <Line data={growthChartData} options={{ responsive: true, plugins: { legend: { labels: { color: "var(--text)" } } }, scales: { y: { ticks: { color: "var(--text)", callback: (value) => `$${value.toLocaleString()}` }, grid: { color: "var(--border)" } }, x: { ticks: { color: "var(--text)" }, grid: { color: "var(--border)" } } } }} />
              ) : (
                <p style={{ textAlign: "center", color: "var(--text)" }}>No growth data available</p>
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
              marginTop: "20px",
              gridColumn: "1 / -1", // Ensure full width
            }}
          >
            <h3>Filtered Financial Data</h3>
            {financialData.length > 0 ? (
              <ul className="financial-data-list">
                {financialData.map((item, index) => (
                  <li key={index}>
                    <span>{item.date} - </span>
                    <span>{item.category} - </span>
                    <span>${item.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No financial data available for the selected filters.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
