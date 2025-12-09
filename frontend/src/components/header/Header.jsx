import React from "react";
import { Bot, Settings, Trash2 } from "lucide-react";
import ProviderDropdown from "./ProviderDropdown";
import IconButton from "../common/IconButton";
import { useChatContext } from "../../context/ChatContext";
import { useSettings } from "../../context/SettingsContext";

const Header = () => {
  const { clearChat } = useChatContext();
  const { setIsSettingsOpen } = useSettings();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Bot />
          <div>
            <h1 className="logo-text">MultiAI</h1>
            <p className="logo-subtitle">One Interface. Multiple AI Minds.</p>
          </div>
        </div>

        <div className="header-actions">
          <ProviderDropdown />

          <IconButton
            title="Clear Chat"
            onClick={clearChat}
          >
            <Trash2 />
          </IconButton>

          <IconButton
            title="Settings"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
