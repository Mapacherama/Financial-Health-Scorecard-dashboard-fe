import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "200px",
        backgroundColor: "var(--background)", // Use CSS variable for background
        color: "var(--text)", // Use CSS variable for text color
        padding: "1rem",
        minHeight: "100vh", // Make sidebar stretch the full height of the viewport
        borderRight: "1px solid var(--border)", // Add a subtle border for separation
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: "1rem" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "var(--text)", // Match text color to dark mode variable
              padding: "0.5rem",
              display: "block",
              borderRadius: "5px",
            }}
          >
            Dashboard
          </Link>
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <Link
            to="/reports"
            style={{
              textDecoration: "none",
              color: "var(--text)",
              padding: "0.5rem",
              display: "block",
              borderRadius: "5px",
            }}
          >
            Reports
          </Link>
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <Link
            to="/settings"
            style={{
              textDecoration: "none",
              color: "var(--text)",
              padding: "0.5rem",
              display: "block",
              borderRadius: "5px",
            }}
          >
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
