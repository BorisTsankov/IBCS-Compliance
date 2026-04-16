from fastapi import APIRouter

from src.api.router.auth.public_routes import router as auth_router
from src.api.router.user.private_route import router as user_router
from src.api.router.dashboard.private_route import router as dashboard_router

# Central router aggregator — include all sub-routers here
router = APIRouter(prefix="/api")

router.include_router(auth_router)
router.include_router(user_router)
router.include_router(dashboard_router)
