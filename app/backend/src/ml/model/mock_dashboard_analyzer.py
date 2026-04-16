def analyze_dashboard_mock(filename: str) -> dict:
    base_result = {
        "overall_result": "partial",
        "overall_score": 72,
        "confidence": "0.88",
        "summary": (
            "The dashboard is partially compliant with IBCS. "
            "The layout is mostly structured, but some visual and hierarchy issues remain."
        ),
        "feedback_json": [
            {
                "category": "Layout & Positioning",
                "score": 95,
                "status": "pass",
                "message": "The layout is mostly structured and aligned."
            },
            {
                "category": "Color & Contrast",
                "score": 62,
                "status": "warning",
                "message": "Some colors reduce readability and semantic clarity."
            },
            {
                "category": "Information Hierarchy",
                "score": 40,
                "status": "fail",
                "message": "Important metrics are not visually prioritized enough."
            },
            {
                "category": "Consistency",
                "score": 85,
                "status": "pass",
                "message": "Visual styling is mostly consistent."
            }
        ]
    }

    lowered = filename.lower()

    if "good" in lowered:
        base_result["overall_result"] = "compliant"
        base_result["overall_score"] = 88
        base_result["summary"] = "The dashboard is mostly compliant with IBCS principles."
    elif "bad" in lowered:
        base_result["overall_result"] = "non_compliant"
        base_result["overall_score"] = 43
        base_result["summary"] = "The dashboard is not compliant with core IBCS principles."

    return base_result