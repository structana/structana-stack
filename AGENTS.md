# AGENTS.md

> 📚 Documentation of all AI/HTTP agents in this stack  
> Place in the repo root or under `docs/` alongside `requirements.md` and `decision-log.md`

---

## 🗂 Agent Catalog

| Agent Name      | Location         | Tech     | Endpoint           | Role / Description                             |
|-----------------|------------------|----------|--------------------|------------------------------------------------|
| **PyHelloAgent** | `py-backend/`    | FastAPI  | `GET /api/py/hello` | Returns `{"message":"Hello from py"}`          |
| **JsHelloAgent** | `js-backend/`    | Node.js  | `GET /api/js/hello` | Returns `{"message":"Hello from js"}`          |
| **FrontendAgent**| `frontend/`      | Static JS| n/a                | Fetches both hello endpoints and renders UI    |
| **TraefikAgent** | `traefik/`       | Traefik  | Dynamic routing    | TLS termination, wildcard/subdomain routing     |

---

## 📖 Agent Definition Template

Use this section to **add new agents** in the future:

```markdown
### AgentName
- **Folder:** `path/to/agent-folder/`
- **Tech stack:** e.g. Python 3.11, FastAPI, Node.js 18, Express
- **Entrypoint:** Dockerfile / server.js / main.py
- **Endpoint(s):**
  - `GET /api/agent-route`
- **Role:** Brief description of its responsibility
- **Dependencies:**
  - Redis, PostgreSQL, external API, etc.
- **Tests:**
  - `tests/test_agent_route.sh`
