
import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

interface VideoDropzoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  maxSize?: number;
}

const ALLOWED_EXTENSIONS = ["mp4", "avi", "mov", "mkv"];

export default function VideoDropzone({
  onFileSelect,
  disabled = false,
  maxSize = 500,
}: VideoDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file?: File) => {
    if (!file) return;

    setError("");

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      setError("Please select MP4, AVI, MOV or MKV video.");
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`Maximum allowed file size is ${maxSize} MB.`);
      return;
    }

    onFileSelect(file);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);

          if (!disabled) {
            validateFile(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-2xl
          p-10 md:p-14 text-center transition-all
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${
            dragging
              ? "border-blue-400 bg-blue-500/10"
              : "border-gray-700 hover:border-blue-500 bg-[#101827]"
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".mp4,.avi,.mov,.mkv"
          className="hidden"
          disabled={disabled}
          onChange={(e) => validateFile(e.target.files?.[0])}
        />

        <div className="flex justify-center mb-5">
          <div className="p-5 rounded-full bg-blue-500/10">
            <UploadCloud size={40} className="text-blue-400" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">
          Drag and drop your video here
        </h2>

        <p className="text-sm text-gray-400 mb-5">
          Or browse files from your computer
        </p>

        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
          className="bg-[#1763F6] hover:bg-[#347AFF]
          text-white px-6 py-2.5 rounded-lg
          font-medium transition-colors disabled:opacity-50"
        >
          Browse Video
        </button>

        <p className="text-xs text-gray-500 mt-5">
          MP4 · AVI · MOV · MKV | Maximum {maxSize} MB
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-400 mt-3">
          {error}
        </p>
      )}
    </div>
  );
}
