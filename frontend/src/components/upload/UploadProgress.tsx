
import {
    CheckCircle2,
    Loader2,
    AlertCircle,
  } from "lucide-react";
  
  interface UploadProgressProps {
    progress: number;
    uploading: boolean;
    error?: string;
  }
  
  export default function UploadProgress({
    progress,
    uploading,
    error,
  }: UploadProgressProps) {
    const completed = !uploading && progress === 100 && !error;
  
    if (!uploading && progress === 0 && !error) {
      return null;
    }
  
    return (
      <div className="bg-[#101827] border border-gray-800
      rounded-xl p-5 mt-5">
  
        {/* Status */}
        <div className="flex justify-between items-center mb-3">
  
          <div className="flex items-center gap-2">
            {error ? (
              <AlertCircle size={18} className="text-red-400" />
            ) : completed ? (
              <CheckCircle2 size={18} className="text-green-400" />
            ) : (
              <Loader2 size={18} className="text-blue-400 animate-spin" />
            )}
  
            <span className="text-sm font-medium text-white">
              {error
                ? "Upload Failed"
                : completed
                ? "Upload Complete"
                : "Uploading Video..."}
            </span>
          </div>
  
          <span className="text-sm text-gray-400">
            {error ? "Failed" : `${progress}%`}
          </span>
        </div>
  
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300
            ${
              error
                ? "bg-red-500"
                : completed
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
            }}
          />
        </div>
  
        {/* Error message */}
        {error && (
          <p className="text-sm text-red-400 mt-3">
            {error}
          </p>
        )}
  
        {completed && (
          <p className="text-sm text-green-400 mt-3">
            Your video has been uploaded successfully.
          </p>
        )}
  
      </div>
    );
  }
  