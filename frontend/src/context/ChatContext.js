import { createContext, useContext } from "react";
import { useChat } from "../hooks/useChat";
import { useSettings } from "./SettingsContext";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const { selectedProvider, apiKeys } = useSettings();
  const { messages, isLoading, sendMessage, clearChat, endRef } =
    useChat(selectedProvider, apiKeys);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        clearChat,
        endRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
