
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 30000,
});

export const checkHealth = async () => {
  const response = await api.get("/api/health");
  return response.data;
};

export const uploadVideo = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/api/upload",
    formData
  );

  return response.data;
};

export default api;
