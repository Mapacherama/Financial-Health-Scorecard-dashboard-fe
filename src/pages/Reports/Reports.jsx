import React from "react";

const Reports = () => {
  const handleDownload = () => {
    window.open("http://127.0.0.1:5000/api/generate_report", "_blank");
  };

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "var(--background)",
        color: "var(--text)",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h2>Financial Health Report</h2>
      <div
        style={{
          backgroundColor: "var(--inputBg)",
          border: "1px solid var(--border)",
          padding: "1.5rem",
          borderRadius: "8px",
          maxWidth: "700px",
          margin: "1rem auto",
          textAlign: "left",
        }}
      >
        {/* Report Sections */}
        <h3>📊 Overview</h3>
        <p>
          A summary of your financial health, including income, expenses, and
          net savings.
        </p>

        <h3>💰 Income & Expenses</h3>
        <p>
          Detailed breakdown of earnings and spending trends over the last few
          months.
        </p>

        <h3>📈 Investment Performance</h3>
        <p>
          A report on your current investments, ROI, and portfolio health.
        </p>

        <h3>🔮 Savings & Forecast</h3>
        <p>
          Your current savings rate and projected financial trajectory.
        </p>

        <h3>🚀 Actionable Insights</h3>
        <p>
          Recommendations to optimize your finances and improve financial
          stability.
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          📥 Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
