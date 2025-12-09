import { createContext, useContext, useState } from "react";
import { useProviders } from "../hooks/useProviders";
import { useApiKeys } from "../hooks/useApiKeys";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const { providers, loading: providersLoading } = useProviders();
  const { apiKeys, updateApiKey } = useApiKeys();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("groq");

  return (
    <SettingsContext.Provider
      value={{
        providers,
        providersLoading,
        apiKeys,
        updateApiKey,
        isSettingsOpen,
        setIsSettingsOpen,
        selectedProvider,
        setSelectedProvider,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
