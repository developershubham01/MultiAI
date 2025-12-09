import React from "react";
import { SettingsProvider } from "./context/SettingsContext";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";
import "./styles/App.css";
import "./styles/Chat.css";
import "./styles/Header.css";
import "./styles/Settings.css";

function App() {
  return (
    <SettingsProvider>
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    </SettingsProvider>
  );
}

export default App;
