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
      <h2>Reports Page</h2>
      <div
        style={{
          backgroundColor: "var(--inputBg)",
          border: "1px solid var(--border)",
          padding: "1.5rem",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "1rem auto",
          textAlign: "center",
        }}
      >
        <p>This is the reports page content.</p>
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
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default Reports;