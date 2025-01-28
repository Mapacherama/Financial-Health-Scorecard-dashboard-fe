import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Access the global theme and toggleTheme function
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    autoSave: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    toggleTheme(event.target.value); // Update the global theme
  };

  const handleSave = () => {
    alert("Settings saved!");
    console.log("Saved settings:", { ...settings, theme });
  };

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
        color: theme === "light" ? "#333" : "#fff",
      }}
    >
      <h2>Settings</h2>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form>
          {/* Theme Selector */}
          <div style={{ marginBottom: "1rem" }}>
            <label>
              <strong>Theme</strong>
              <select
                value={theme}
                onChange={handleThemeChange}
                style={{
                  marginLeft: "1rem",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: theme === "light" ? "1px solid #ddd" : "1px solid #555",
                  backgroundColor: theme === "light" ? "#fff" : "#333",
                  color: theme === "light" ? "#000" : "#fff",
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>

          {/* Notifications */}
          <div style={{ marginBottom: "1rem" }}>
            <label>
              <strong>Enable Notifications</strong>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={() => handleToggle("notifications")}
                style={{ marginLeft: "1rem" }}
              />
            </label>
          </div>

          {/* Email Updates */}
          <div style={{ marginBottom: "1rem" }}>
            <label>
              <strong>Email Updates</strong>
              <input
                type="checkbox"
                checked={settings.emailUpdates}
                onChange={() => handleToggle("emailUpdates")}
                style={{ marginLeft: "1rem" }}
              />
            </label>
          </div>

          {/* Auto-Save */}
          <div style={{ marginBottom: "1rem" }}>
            <label>
              <strong>Auto-Save</strong>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={() => handleToggle("autoSave")}
                style={{ marginLeft: "1rem" }}
              />
            </label>
          </div>

          {/* Save Button */}
          <div>
            <button
              type="button"
              onClick={handleSave}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: theme === "light" ? "#4caf50" : "#37474f",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
