
export interface VideoUploadResponse {
    video_id: string;
    filename: string;
    status: string;
  }
  
  export interface VideoFile {
    file: File;
    previewUrl: string;
  }
  