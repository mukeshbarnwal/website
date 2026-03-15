# Backend requirements (from project-design.MD)

What to add in the backend according to the project design.

---

## 1. Tech stack

| Requirement | What to use |
|-------------|-------------|
| Framework | **Django** |
| API layer | **Django REST Framework** |
| Database | **PostgreSQL** |
| CORS | **django-cors-headers** (allow frontend origin) |

---

## 2. Phase 1 — Project setup

- Create project: `django-admin startproject portfolio_backend`
- Create app: `python manage.py startapp api`
- Install: `djangorestframework`, `psycopg2-binary`, `django-cors-headers`
- Configure:
  - Add `rest_framework`, `corsheaders`, `api` to `INSTALLED_APPS`
  - Add `corsheaders.middleware.CorsMiddleware` (high in `MIDDLEWARE`)
  - Set `CORS_ALLOWED_ORIGINS` (or `CORS_ALLOW_ALL_ORIGINS` for dev) for the Next.js frontend URL
  - Point `DATABASES` to PostgreSQL (or SQLite for local dev)

---

## 3. Phase 3 — APIs to implement

### Contact API

- **Endpoint:** `POST /api/contact/`
- **Purpose:** Accept contact form submissions (name, email, message).
- **Backend:** Model to store submissions (e.g. `ContactSubmission`: name, email, message, created_at). Validate input; return 201 or 400. Optionally send email or enqueue notification.

### Projects API

- **Endpoint:** `GET /api/projects/`
- **Purpose:** Return list of production systems for the Projects page.
- **Backend:** Model for projects with fields matching the UI card:
  - **Problem**
  - **Why it was hard**
  - **Tech stack** (array or comma-separated / JSON)
  - **Architecture summary**
  - Plus: title, slug, order, etc.
- **Response:** JSON array of project objects. Can be read-only from DB or admin-editable.

### Chat API

- **Endpoint:** `POST /api/chat/`
- **Purpose:** Power the AI Lab “Ask Me Anything” demo.
- **Request body:** e.g. `{ "message": "user question" }`
- **Response:** e.g. `{ "reply": "generated answer" }` (or streamed later).
- **Backend (Phase 4):** Implement RAG + LLM here; until then return a placeholder reply.

---

## 4. Phase 4 — RAG + AI layer

Implement inside the Chat API (or a dedicated service module):

1. **Documents**
   - Prepare documents about you and your systems (markdown/text).
   - Chunk and normalize for retrieval.

2. **Embeddings**
   - Use **BGE-M3** (or another embedding model) to generate embeddings for chunks.
   - Store vectors in **Qdrant** (Qdrant Cloud or Docker).

3. **Retrieval**
   - Build a retrieval function: user question → embed → vector search in Qdrant → return top-K chunks.

4. **LLM**
   - Use **Llama 3.1** or **OpenAI**.
   - Prompt: system + retrieved context + user question → generate answer.
   - Optionally use **LangChain** or **LlamaIndex** for orchestration.

5. **Chat API flow**
   - Receive `message` → embed → retrieve from Qdrant → build prompt → call LLM → return reply.  
   - Test from backend only (e.g. Postman) before wiring frontend.

---

## 5. Admin features (from design)

- **Add/edit projects** — Django admin (or custom admin views) for the Projects model.
- **View contact submissions** — Django admin for ContactSubmission.
- **Add blog posts (optional)** — Optional Blog/Post model and admin; not required for MVP.

---

## 6. Production improvements (Section 8)

| Item | What to add |
|------|-------------|
| **Rate limiting** | django-ratelimit or throttling in DRF (e.g. on `/api/chat/` and `/api/contact/`). |
| **Environment variables** | Use `python-decouple` or `django-environ`; store `SECRET_KEY`, `DB URL`, `OPENAI_API_KEY`, Qdrant URL, etc. |
| **API keys protection** | Never commit keys; use env vars; optional API key auth for chat if you want to restrict access. |
| **Logging** | Configure Django `LOGGING` (e.g. to file and console; log API errors and chat requests). |
| **Monitoring** | Health check endpoint (e.g. `/api/health/`); optional APM (e.g. Sentry). |
| **Dockerization** | `Dockerfile` for the Django app; optional `docker-compose` with Django + PostgreSQL + Qdrant for local/prod. |

---

## 7. Deployment (Section 7)

- **Backend host:** Render, Railway, or Azure App Service.
- **Database:** Managed PostgreSQL (e.g. Render Postgres, Railway, Neon).
- **Vector DB:** Qdrant Cloud or Qdrant in Docker on a VPS.

---

## 8. Suggested backend layout

```
portfolio_backend/
├── manage.py
├── portfolio_backend/
│   ├── settings.py    # CORS, DRF, DB, env vars
│   ├── urls.py        # include api.urls at /api/
│   └── ...
├── api/
│   ├── models.py      # ContactSubmission, Project
│   ├── serializers.py # DRF serializers
│   ├── views.py       # Contact, Projects, Chat views
│   ├── urls.py        # contact/, projects/, chat/
│   ├── services/      # (optional) rag.py, embeddings.py, qdrant_client.py
│   └── admin.py       # Register models
├── requirements.txt
├── .env.example
└── Dockerfile (optional)
```

---

## 9. Frontend connection (Phase 5)

- Next.js calls:
  - `POST /api/contact/` with form data.
  - `GET /api/projects/` to render Production Systems.
  - `POST /api/chat/` with `{ "message": "..." }`, display `reply` in chat UI.
- Add loading state, error handling, and timeout handling in the frontend for these calls.

---

This document is the single checklist for what to add in the backend according to `project-design.MD`.
