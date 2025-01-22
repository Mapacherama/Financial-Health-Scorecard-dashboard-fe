// src/pages/Reports.jsx

import React from "react";

const Reports = () => {
  return (
    <div style={{
      padding: "1rem",
      backgroundColor: "var(--background)",
      color: "var(--text)",
      minHeight: "100vh"
    }}>
      <h2>Reports Page</h2>
      <div style={{
        backgroundColor: "var(--inputBg)",
        border: "1px solid var(--border)",
        padding: "1.5rem",
        borderRadius: "5px"
      }}>
        <p>This is the reports page content.</p>
      </div>
    </div>
  );
};

export default Reports;
