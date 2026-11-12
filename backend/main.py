
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil
import uuid

app = FastAPI(
    title="PanoView AI API",
    description="Video Depth-Aware Panoptic Segmentation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "PanoView AI API is running",
        "status": "online"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "model": "not_loaded"
    }


@app.post("/api/upload")
async def upload_video(file: UploadFile = File(...)):

    allowed_extensions = {".mp4", ".avi", ".mov", ".mkv"}

    extension = Path(file.filename or "").suffix.lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Unsupported video format"
        )

    video_id = str(uuid.uuid4())
    destination = UPLOAD_DIR / f"{video_id}{extension}"

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "video_id": video_id,
        "filename": file.filename,
        "status": "uploaded",
        "message": "Video uploaded successfully"
    }


@app.get("/api/status/{video_id}")
def processing_status(video_id: str):
    return {
        "video_id": video_id,
        "status": "uploaded"
    }
