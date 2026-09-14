# Recipe Pantry

Recipe Pantry is a full-stack recipe manager for browsing, creating, editing, and organizing recipes by category. It stores recipes, ingredients, instructions, pictures, durations, and category colors in a relational database.

## Features

- Browse all recipes and open an individual recipe page
- Create, edit, and delete recipes
- Add and reuse categories
- Manage ingredients, quantities, units, instructions, pictures, and duration
- Filter/display category badges and duration details in the React UI
- Flask JSON API with MySQL persistence
- Database health endpoint for deployment checks
- Docker-ready production API using Gunicorn
- Bruno API collection in `bruno_endpoints.json`

The existing recipe, category, seed-data, frontend, and API features are preserved. This update focuses on safer configuration, current runtimes, production deployment, and more reliable local setup.

## Stack

### Frontend

- React 19
- Vite 7
- React Bootstrap and Bootstrap 5
- React Router 7
- React Select

### API

- Python 3.13
- Flask 3.1
- Flask-SQLAlchemy
- PyMySQL
- Flask-CORS
- Gunicorn for production serving

## Requirements

- Python 3.13 or newer
- Node.js 20.19 or newer
- npm 10 or newer
- MySQL 8 or a compatible MySQL server

## Configuration

The API reads its settings from environment variables. Create an `api/.env` file for local development:

```dotenv
DB_USER=recipe_pantry
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=recipe_pantry
APP_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
PORT=5000
FLASK_DEBUG=1
```

Copy the frontend template to configure the API origin:

```powershell
Copy-Item app/.env.example app/.env
```

The frontend defaults to `http://localhost:5000/api` when `VITE_API_URL` is not set.

Never commit database passwords or production configuration. Use a secret manager or deployment environment variables in production.

## Database

The API expects the tables represented by the SQLAlchemy models in `api/models`. The included `recipes.csv`, `recipes.json`, and `api/import_recipes.py` support loading recipe data into an existing schema.

## Local development

Install and start the API:

```powershell
cd api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python app.py
```

The API runs at `http://localhost:5000`.

In a second terminal, install and start the frontend:

```powershell
cd app
npm install
npm run dev
```

The Vite development server runs at `http://localhost:5173`.

Check API and database readiness:

```powershell
Invoke-RestMethod http://localhost:5000/health
```

Expected response:

```json
{
	"status": "ok",
	"database": "connected"
}
```

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | API welcome response |
| `GET` | `/health` | API and database readiness |
| `GET` | `/api/recipes` | List recipes |
| `GET` | `/api/recipes/<id>` | Read one recipe |
| `POST` | `/api/recipes` | Create a recipe |
| `PUT` | `/api/recipes/<id>` | Update a recipe |
| `DELETE` | `/api/recipes/<id>` | Delete a recipe |
| `GET` | `/api/categories` | List categories |
| `POST` | `/api/categories` | Create a category |

The Bruno collection contains request examples for the API.

## Production container

Build the API image from the repository root:

```powershell
docker build -t recipe-pantry-api .
```

Run it with database configuration supplied at runtime:

```powershell
docker run --rm -p 5000:5000 `
	-e DB_USER=recipe_pantry `
	-e DB_PASSWORD=your-password `
	-e DB_HOST=host.docker.internal `
	-e DB_PORT=3306 `
	-e DB_NAME=recipe_pantry `
	-e CORS_ORIGINS=http://localhost:5173 `
	recipe-pantry-api
```

The container uses Python 3.13, Gunicorn, two workers, and a non-root application user. Secrets are intentionally not stored in the Dockerfile.

Build the frontend for deployment:

```powershell
cd app
npm run build
npm run preview
```

## Validation

Frontend checks:

```powershell
cd app
npm run lint
npm run build
```

API checks:

```powershell
cd api
python -m compileall .
```

## Project structure

```text
recipe-pantry/
├── api/                 # Flask API, models, and import tooling
├── app/                 # React/Vite frontend
├── recipes.csv          # Source recipe data
├── recipes.json         # JSON recipe data
├── bruno_endpoints.json # API request collection
├── Dockerfile           # Production API image
└── README.md
```
