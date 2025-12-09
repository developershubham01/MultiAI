import React, { useState } from "react";
import Header from "../components/header/Header";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";
import SettingsPanel from "../components/settings/SettingsPanel";
import { useChatContext } from "../context/ChatContext";
import { useSettings } from "../context/SettingsContext";

const ChatPage = () => {
  const { messages, isLoading, sendMessage, endRef } = useChatContext();
  const { providers, selectedProvider } = useSettings();
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  const exportChat = () => {
    const chatData = {
      messages,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importChat = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (Array.isArray(parsed.messages)) {
          localStorage.setItem("chatHistory", JSON.stringify(parsed.messages));
          window.location.reload();
        } else {
          alert("Invalid chat file");
        }
      } catch {
        alert("Error parsing chat file");
      }
    };
    reader.readAsText(file);
  };

  const providerName =
    providers[selectedProvider]?.name || "AI Provider";

  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <MessageList
          messages={messages}
          onCopy={handleCopy}
          copiedMessageId={copiedMessageId}
          endRef={endRef}
          isLoading={isLoading}
        />
        <ChatInput
          onSend={sendMessage}
          disabled={isLoading}
          placeholder={`Message ${providerName}... (Shift+Enter = new line)`}
        />
      </div>
      <SettingsPanel onExport={exportChat} onImport={importChat} />
    </div>
  );
};

export default ChatPage;
