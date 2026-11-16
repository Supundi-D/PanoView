
import { useEffect, useRef, useState } from "react";
import {
  CloudUpload,
  Upload,
  Video,
  X,
  FileVideo,
  CheckCircle2,
} from "lucide-react";
import VideoDropzone from "../components/upload/VideoDropzone";
import VideoPreview from "../components/upload/VideoPreview";
import UploadProgress from "../components/upload/UploadProgress";

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const SUPPORTED_FORMATS = ["mp4", "avi", "mov", "mkv"];

export default function VideoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (!file) {
      setVideoUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const validateFile = (selectedFile: File) => {
    setError("");

    const extension = selectedFile.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!extension || !SUPPORTED_FORMATS.includes(extension)) {
      setError("Unsupported format. Please select MP4, AVI, MOV or MKV.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds the maximum limit of 500 MB.");
      return;
    }

    if (selectedFile.size === 0) {
      setError("The selected video file is empty.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      validateFile(selectedFile);
    }

    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const selectedFile = event.dataTransfer.files?.[0];

    if (selectedFile) {
      validateFile(selectedFile);
    }
  };

  const formatFileSize = (size: number) => {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  return (
    <div className="w-full min-h-full px-6 sm:px-10 lg:px-16 pt-16 pb-12">

      {/* Page Heading */}
      <div className="max-w-[1140px] mx-auto">

        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-[#101E39] flex items-center justify-center">
            <CloudUpload
              size={28}
              className="text-[#439BFF]"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-100">
            Video Upload
          </h1>
        </div>

        {/* <p className="text-[#929CAC] text-base md:text-lg ml-1 sm:ml-[78px] mt-6">
          Upload your driving video for AI analysis.
        </p> */}

        {/* Upload Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => {
            if (!file) inputRef.current?.click();
          }}
          className={`
            mt-10 min-h-[395px] rounded-[22px]
            border-2 border-dashed
            flex flex-col items-center justify-center
            transition-all duration-200
            ${
              dragActive
                ? "border-blue-400 bg-[#172B4B]"
                : "border-[#267DFF] bg-[#111A2B]"
            }
            ${!file ? "cursor-pointer hover:bg-[#142038]" : ""}
          `}
        >

          <input
            ref={inputRef}
            type="file"
            accept=".mp4,.avi,.mov,.mkv,video/mp4,video/quicktime,video/x-msvideo,video/x-matroska"
            className="hidden"
            onChange={handleFileChange}
          />

          {!file ? (
            <>
              {/* Upload Icon */}
              <div className="w-24 h-24 rounded-full bg-[#172744] flex items-center justify-center mb-6">
                <CloudUpload
                  size={46}
                  strokeWidth={2}
                  className="text-[#439BFF]"
                />
              </div>

              <h2 className="text-xl md:text-2xl font-medium text-slate-100 mb-2">
                Drag and drop your video here
              </h2>

              <p className="text-[#929CAC] text-base mb-8">
                Or click to browse files from your computer
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="bg-[#1763F6] hover:bg-[#347AFF] text-white px-6 mb-4 mt-4 gap-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                Browse Video
              </button>

              <p className="text-[#697386] text-sm  mt-10">
                Supported formats: MP4, AVI, MOV, MKV
                <span className="mx-2">·</span>
                Maximum 500 MB
              </p>
            </>
          ) : (
            <div
              className="w-full max-w-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-white">
                  Video Selected
                </h2>

                <button
                  onClick={removeFile}
                  className="text-slate-400 hover:text-red-400"
                  title="Remove video"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="bg-[#0B1220] rounded-xl p-4 flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-lg bg-[#172744] flex items-center justify-center shrink-0">
                  <FileVideo className="text-blue-400" size={25} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-slate-400 mt-10">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <CheckCircle2 className="text-green-400" size={22} />
              </div>

              {videoUrl && file.type.startsWith("video/") && (
                <video
                  src={videoUrl}
                  controls
                  className="w-full max-h-[280px] rounded-xl bg-black"
                />
              )}

              <div className="flex flex-wrap gap-3 mt-">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="px-5 py-2.5 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800"
                >
                  Replace Video
                </button>

                <button
                  onClick={removeFile}
                  className="px-5 py-2.5 rounded-lg bg-[#1763F6] hover:bg-blue-500 text-white"
                >
                  Remove Video
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Validation Error */}
        {error && (
          <div className="mt-4 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

      </div>
    </div>
  );
}
