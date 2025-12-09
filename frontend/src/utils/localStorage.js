export const loadJson = (key, defaultValue = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading localStorage key:", key, e);
    return defaultValue;
  }
};

export const saveJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error writing localStorage key:", key, e);
  }
};

export const removeKey = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing localStorage key:", key, e);
  }
};
