
const API_URL = "http://127.0.0.1:5000";

export const analyzeWall = async (formData) => {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  return await response.json();
};

export const getHistory = async () => {
  const response = await fetch(`${API_URL}/history`);
  return await response.json();
};

export const getDashboard = async () => {
  const response = await fetch(`${API_URL}/dashboard`);
  return await response.json();
};