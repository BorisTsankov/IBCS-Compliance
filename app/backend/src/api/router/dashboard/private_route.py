from fastapi import APIRouter
from src.api.controllers.dashboard_controller import router as dashboard_controller_router

router = APIRouter()
router.include_router(dashboard_controller_router)