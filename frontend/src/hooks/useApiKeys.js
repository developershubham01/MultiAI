import { useState, useEffect } from "react";
import { API_KEYS_STORAGE_KEY } from "../utils/constants";
import { loadJson, saveJson } from "../utils/localStorage";

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState({});

  useEffect(() => {
    const stored = loadJson(API_KEYS_STORAGE_KEY, {});
    setApiKeys(stored || {});
  }, []);

  const updateApiKey = (provider, key) => {
    const updated = { ...apiKeys, [provider]: key };
    setApiKeys(updated);
    saveJson(API_KEYS_STORAGE_KEY, updated);
  };

  return { apiKeys, updateApiKey };
};
