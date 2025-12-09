import { useEffect, useState } from "react";
import { fetchProvidersApi } from "../api/aiApi";

export const useProviders = () => {
  const [providers, setProviders] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProvidersApi();
      setProviders(res.data || {});
    } catch (e) {
      console.error("Error fetching providers", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return { providers, loading, error, refetch: fetchProviders };
};
