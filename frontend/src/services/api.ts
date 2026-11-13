
import type { VideoUploadResponse } from "../types/video";

const API_BASE_URL = "http://localhost:8000";

export const uploadVideo = (
  file: File,
  onProgress: (progress: number) => void
): Promise<VideoUploadResponse> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_BASE_URL}/api/upload`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(
          Math.round((event.loaded / event.total) * 100)
        );
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Video upload failed."));
      }
    };

    xhr.onerror = () => reject(new Error("Network error."));
    xhr.send(formData);
  });
};
