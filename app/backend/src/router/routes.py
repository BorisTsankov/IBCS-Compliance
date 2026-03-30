from fastapi import APIRouter

from src.router.auth.public_routes import router as auth_router
from src.router.user.private_route import router as user_router

# Central router aggregator — include all sub-routers here
router = APIRouter(prefix="/api")

router.include_router(auth_router)
router.include_router(user_router)
