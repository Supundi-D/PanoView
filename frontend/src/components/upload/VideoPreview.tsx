
import {
    FileVideo,
    X,
    CheckCircle2,
  } from "lucide-react";
  
  interface VideoPreviewProps {
    file: File;
    previewUrl: string;
    onRemove: () => void;
    disabled?: boolean;
    uploaded?: boolean;
  }
  
  export default function VideoPreview({
    file,
    previewUrl,
    onRemove,
    disabled = false,
    uploaded = false,
  }: VideoPreviewProps) {
    const formatSize = (size: number) => {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    };
  
    const extension = file.name.split(".").pop()?.toLowerCase();
  
    const canPreview = ["mp4", "mov"].includes(extension || "");
  
    return (
      <div className="bg-[#101827] border border-gray-800 rounded-2xl p-5">
  
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-white">
            Selected Video
          </h3>
  
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className="text-gray-400 hover:text-red-400
            transition-colors disabled:opacity-40"
          >
            <X size={20} />
          </button>
        </div>
  
        {/* File information */}
        <div className="flex items-center gap-4 mb-5">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <FileVideo size={28} className="text-blue-400" />
          </div>
  
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">
              {file.name}
            </p>
  
            <p className="text-sm text-gray-400">
              {formatSize(file.size)} · {extension?.toUpperCase()}
            </p>
          </div>
  
          {uploaded ? (
            <CheckCircle2 className="text-green-400" size={22} />
          ) : (
            <span className="text-xs text-blue-400">
              Ready
            </span>
          )}
        </div>
  
        {/* Video player */}
        {canPreview ? (
          <div className="rounded-xl overflow-hidden bg-black">
            <video
              src={previewUrl}
              controls
              preload="metadata"
              className="w-full max-h-[400px] object-contain"
            >
              Your browser does not support video playback.
            </video>
          </div>
        ) : (
          <div className="bg-[#080D18] rounded-xl p-6 text-center">
            <FileVideo
              size={35}
              className="text-gray-500 mx-auto mb-2"
            />
            <p className="text-sm text-gray-400">
              Preview is unavailable for this video format.
              The original file can still be uploaded.
            </p>
          </div>
        )}
  
      </div>
    );
  }
  