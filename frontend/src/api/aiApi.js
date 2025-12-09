import axiosInstance from "./axiosInstance";

export const fetchProvidersApi = () =>
  axiosInstance.get("/providers");

export const sendChatApi = (provider, payload, apiKey) =>
  axiosInstance.post(`/chat/${provider}`, payload, {
    headers: {
      "X-API-KEY": apiKey || "",
    },
  });
