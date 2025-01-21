import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "light", // "light" or "dark"
    notifications: true,
    emailUpdates: true,
    autoSave: false,
  });

  const handleToggle = (key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  const handleThemeChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      theme: event.target.value,
    }));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Settings</h2>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form>
          {/* Theme Selector */}
          <div style={{ marginBottom: "1rem" }}>
            <label>
              <strong>Theme</strong>
              <select
                value={settings.theme}
                onChange={handleThemeChange}
                style={{ marginLeft: "1rem" }}
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
              onClick={() => alert("Settings saved!")}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#4caf50",
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
