from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Application settings
    app_name: str = "Nyay Sarthi"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Database settings
    database_url: str = "sqlite:///./data/nyay_sarthi.db"
    
    # Security settings
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Vector database settings
    chroma_persist_directory: str = "./vector_db"
    
    # File upload settings
    upload_dir: str = "./uploads"
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    
    # Logging settings
    log_dir: str = "./logs"
    log_level: str = "INFO"
    
    # External API settings
    openai_api_key: Optional[str] = None
    
    # Redis settings
    redis_url: str = "redis://localhost:6379"
    
    class Config:
        env_file = ".env"

settings = Settings()
