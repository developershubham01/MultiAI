import React from "react";
import { useSettings } from "../../context/SettingsContext";

const ProviderDropdown = () => {
  const { providers, selectedProvider, setSelectedProvider } = useSettings();

  return (
    <select
      value={selectedProvider}
      onChange={(e) => setSelectedProvider(e.target.value)}
      className="provider-dropdown"
    >
      {Object.entries(providers)
        .filter(([_, info]) => info.enabled !== false)
        .map(([key, info]) => (
          <option key={key} value={key}>
            {info.name || key}
          </option>
        ))}
    </select>
  );
};

export default ProviderDropdown;
