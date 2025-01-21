import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "200px", background: "#f4f4f4", padding: "1rem" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "1rem" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
            Dashboard
          </Link>
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <Link to="/reports" style={{ textDecoration: "none", color: "#333" }}>
            Reports
          </Link>
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <Link to="/settings" style={{ textDecoration: "none", color: "#333" }}>
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
