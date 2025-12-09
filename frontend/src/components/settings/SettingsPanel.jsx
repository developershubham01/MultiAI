import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, Download, Trash2, User } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { useChatContext } from "../../context/ChatContext";
import ApiKeyInput from "./ApiKeyInput";

const SettingsPanel = ({ onExport, onImport }) => {
  const {
    providers,
    isSettingsOpen,
    setIsSettingsOpen,
    selectedProvider,
    setSelectedProvider,
    apiKeys,
    updateApiKey,
  } = useSettings();
  const { clearChat } = useChatContext();

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="settings-backdrop"
            onClick={() => setIsSettingsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="settings-panel custom-scrollbar"
          >
            <div className="settings-content">
              <div className="settings-header">
                <h2 className="settings-title">Settings</h2>
                <button
                  className="icon-button"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <User />
                </button>
              </div>

              <div className="provider-selection">
                <h3 className="section-title">AI Provider</h3>
                <div className="provider-list">
                  {Object.entries(providers).map(([key, info]) => (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`provider-item ${
                        selectedProvider === key ? "provider-item-selected" : ""
                      }`}
                      onClick={() => setSelectedProvider(key)}
                    >
                      <div className="provider-info">
                        <div className="provider-name">{info.name}</div>
                        <div className="provider-model">{info.model}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="api-keys-section">
                <h3 className="section-title">API Keys</h3>
                <div className="provider-list">
                  {Object.entries(providers).map(([key, info]) => (
                    <ApiKeyInput
                      key={key}
                      providerKey={key}
                      providerInfo={info}
                      value={apiKeys[key]}
                      onChange={updateApiKey}
                    />
                  ))}
                </div>
              </div>

              <div className="chat-management">
                <h3 className="section-title">Chat Management</h3>
                <button
                  onClick={clearChat}
                  className="management-button management-button-clear"
                >
                  <Trash2 />
                  <span>Clear Chat History</span>
                </button>

                <button
                  onClick={onExport}
                  className="management-button management-button-export"
                >
                  <Download />
                  <span>Export Chat</span>
                </button>

                <label className="file-input-wrapper">
                  <div className="management-button management-button-import">
                    <Upload />
                    <span>Import Chat</span>
                  </div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={onImport}
                    className="file-input"
                  />
                </label>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
