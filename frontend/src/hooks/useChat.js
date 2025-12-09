import { useEffect, useState, useRef } from "react";
import { CHAT_HISTORY_KEY } from "../utils/constants";
import { loadJson, saveJson, removeKey } from "../utils/localStorage";
import { sendChatApi } from "../api/aiApi";

export const useChat = (selectedProvider, apiKeys) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    const saved = loadJson(CHAT_HISTORY_KEY, []);
    setMessages(saved || []);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveHistory = (msgs) => {
    setMessages(msgs);
    saveJson(CHAT_HISTORY_KEY, msgs);
  };

  const clearChat = () => {
    setMessages([]);
    removeKey(CHAT_HISTORY_KEY);
  };

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
      provider: selectedProvider,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    saveJson(CHAT_HISTORY_KEY, newMessages);
    setIsLoading(true);

    try {
      const payload = {
        messages: newMessages.slice(-10).map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: 0.7,
        maxTokens: 2000,
      };

      const res = await sendChatApi(
        selectedProvider,
        payload,
        apiKeys[selectedProvider]
      );

      const data = res.data;

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.content,
        timestamp: data.timestamp || new Date().toISOString(),
        provider: selectedProvider,
        model: data.model,
        usage: data.usage || null,
      };

      const updated = [...newMessages, aiMessage];
      saveHistory(updated);
    } catch (e) {
      console.error("Error sending message", e);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          e?.response?.data?.content ||
          "API Error: Check your backend or API key.",
        timestamp: new Date().toISOString(),
        isError: true,
        provider: selectedProvider,
      };
      const updated = [...newMessages, errorMessage];
      saveHistory(updated);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    endRef,
  };
};
