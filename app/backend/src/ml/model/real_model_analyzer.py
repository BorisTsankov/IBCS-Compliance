from pathlib import Path
from ultralytics import YOLO

MODEL = YOLO("src/ml/model/best.pt")
ANNOTATED_DIR = Path("uploads/annotated")
ANNOTATED_DIR.mkdir(parents=True, exist_ok=True)


def analyze_dashboard_real(file_path: str) -> dict:
    results = MODEL(file_path)

    detections = []
    annotated_image_path = None

    for result in results:
        if result.boxes is not None:
            for box in result.boxes:
                cls_id = int(box.cls.item())
                confidence = float(box.conf.item())
                class_name = result.names[cls_id]
                coords = [round(x, 2) for x in box.xyxy[0].tolist()]

                detections.append({
                    "class_name": class_name,
                    "confidence": round(confidence, 4),
                    "box": coords
                })

        output_path = ANNOTATED_DIR / Path(file_path).name
        result.save(filename=str(output_path))
        annotated_image_path = str(output_path).replace("\\", "/")

    has_bar_chart = any(d["class_name"] == "bar_chart" for d in detections)

    if has_bar_chart:
        overall_result = "partial"
        overall_score = 70
        feedback = [
            {
                "category": "Chart Type",
                "score": 70,
                "status": "pass",
                "message": "Bar chart detected, which aligns with IBCS recommendations."
            }
        ]
        summary = f"Detected {len(detections)} chart element(s), including a bar chart."
    else:
        overall_result = "non_compliant"
        overall_score = 40
        feedback = [
            {
                "category": "Chart Type",
                "score": 40,
                "status": "fail",
                "message": "No bar charts detected."
            }
        ]
        summary = "No bar chart detected."

    return {
        "overall_result": overall_result,
        "overall_score": overall_score,
        "confidence": str(detections[0]['confidence']) if detections else "0.0",
        "summary": summary,
        "feedback_json": feedback,
        "annotated_image_path": annotated_image_path,
        "detections_json": detections
    }