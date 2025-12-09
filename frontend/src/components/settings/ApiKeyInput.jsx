import React from "react";

const ApiKeyInput = ({ providerKey, providerInfo, value, onChange }) => {
  return (
    <div className="api-key-group">
      <label className="section-title">
        {providerInfo.name} Key
      </label>
      <input
        type="password"
        value={value || ""}
        onChange={(e) => onChange(providerKey, e.target.value)}
        placeholder={`Enter ${providerInfo.name} API key`}
        className="api-key-input"
      />
    </div>
  );
};

export default ApiKeyInput;
