import os
import uuid
from pathlib import Path
from fastapi import UploadFile
from src.dal.repo.dashboard_repo import DashboardRepository
from src.ml.model.mock_dashboard_analyzer import analyze_dashboard_mock
from src.ml.model.real_model_analyzer import analyze_dashboard_real


class DashboardService:
    ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".pdf", ".pptx", ".docx"}
    UPLOAD_DIR = Path("uploads/dashboards")

    def __init__(self, repo: DashboardRepository):
        self.repo = repo
        self.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    def _validate_file(self, file: UploadFile):
        if not file.filename:
            raise ValueError("No file name provided.")

        extension = Path(file.filename).suffix.lower()
        if extension not in self.ALLOWED_EXTENSIONS:
            raise ValueError("Unsupported file format.")

    def _save_file(self, file: UploadFile) -> tuple[str, str]:
        extension = Path(file.filename).suffix.lower()
        stored_filename = f"{uuid.uuid4()}{extension}"
        stored_path = self.UPLOAD_DIR / stored_filename

        with open(stored_path, "wb") as buffer:
            buffer.write(file.file.read())

        return stored_filename, str(stored_path)

    def analyze_dashboard(self, file: UploadFile, user_id: int | None = None):
        self._validate_file(file)

        if file.size == 0:
            raise ValueError("Uploaded file is empty.")

        stored_filename, stored_path = self._save_file(file)

        analysis = self.repo.create_analysis({
            "user_id": user_id,
            "original_filename": file.filename,
            "stored_filename": stored_filename,
            "file_path": stored_path,
            "file_type": file.content_type or "unknown",
            "file_size": file.size or 0,
            "status": "processing"
        })

        try:
            result = analyze_dashboard_real(stored_path)

            updated = self.repo.update_analysis(analysis.id, {
    "status": "completed",
    "overall_result": result["overall_result"],
    "overall_score": result["overall_score"],
    "confidence": result["confidence"],
    "summary": result["summary"],
    "feedback_json": result["feedback_json"],
    "annotated_image_path": result.get("annotated_image_path"),
    "detections_json": result.get("detections_json")
})

            return updated

        except Exception as ex:
            failed = self.repo.update_analysis(analysis.id, {
                "status": "failed",
                "error_message": str(ex)
            })
            return failed

    def get_history(self, user_id: int):
        return self.repo.get_user_history(user_id)

    def get_analysis_by_id(self, analysis_id: int):
        return self.repo.get_analysis_by_id(analysis_id)