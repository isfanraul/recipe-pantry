import os
from urllib.parse import quote_plus

class Config:
    DB_USER = os.getenv('DB_USER', 'recipe_pantry')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '3306')
    DB_NAME = os.getenv('DB_NAME', 'recipe_pantry')

    SQLALCHEMY_DATABASE_URI = (
        f'mysql+pymysql://{quote_plus(DB_USER)}:{quote_plus(DB_PASSWORD or "")}@'
        f'{DB_HOST}:{DB_PORT}/{quote_plus(DB_NAME)}'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 280,
    }

    APP_URL = os.getenv('APP_URL', 'http://localhost:5173')
    CORS_ORIGINS = [origin.strip() for origin in os.getenv('CORS_ORIGINS', APP_URL).split(',') if origin.strip()]
