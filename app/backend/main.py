from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from src.config.db import Base, engine
from src.config.errors import AppError
from src.api.router.routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Scoped API", version="0.1.0")

@app.exception_handler(AppError)
async def app_error_handler(_request: Request, exc: AppError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail,
    )


app.include_router(router)


@app.get("/")
def health_check():
    return {"status": "ok"}