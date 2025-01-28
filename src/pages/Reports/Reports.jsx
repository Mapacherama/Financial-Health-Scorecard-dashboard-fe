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
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Financial Health Report
      </h2>

      <div
        style={{
          backgroundColor: "var(--inputBg)",
          border: "1px solid var(--border)",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "700px",
          margin: "1rem auto",
          textAlign: "left",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Report Sections */}
        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>📊 Overview</h3>
        <p style={{ fontSize: "1rem", color: "#e0e0e0", marginBottom: "1rem" }}>
          A summary of your financial health, including income, expenses, and net savings.
        </p>

        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffd700" }}>💰 Income & Expenses</h3>
        <p style={{ fontSize: "1rem", color: "#e0e0e0", marginBottom: "1rem" }}>
          Detailed breakdown of earnings and spending trends over the last few months.
        </p>

        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#add8e6" }}>📈 Investment Performance</h3>
        <p style={{ fontSize: "1rem", color: "#e0e0e0", marginBottom: "1rem" }}>
          A report on your current investments, ROI, and portfolio health.
        </p>

        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#dda0dd" }}>🔮 Savings & Forecast</h3>
        <p style={{ fontSize: "1rem", color: "#e0e0e0", marginBottom: "1rem" }}>
          Your current savings rate and projected financial trajectory.
        </p>

        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ff6666" }}>🚀 Actionable Insights</h3>
        <p style={{ fontSize: "1rem", color: "#e0e0e0", marginBottom: "1rem" }}>
          Recommendations to optimize your finances and improve financial stability.
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "1.1rem",
            backgroundColor: "#ff5733",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          📥 Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
