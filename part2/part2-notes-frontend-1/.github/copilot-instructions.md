# AI Coding Agent Instructions — part2-notes-frontend (branch: part2-1)

Use this to get productive fast in this repo. Keep changes minimal and consistent with current patterns.

## Overview

- Stack: React 18 + Vite 6, Axios, ESLint 9.
- Scope: Single-page phonebook UI; no routing.
- Branching: Course stages live in branches; here we are on `part2-1`.

## Architecture & Data Flow

- Entry: `src/main.jsx` mounts `<App />` to `#root`.
- State: `src/App.jsx` owns `persons`, `newName`, `newPhone`.
- Data load: `useEffect` calls `axios.get('http://localhost:3001/persons')` → sets `persons`.
- UI: `PersonForm` (controlled inputs) → `onSubmit` appends to local `persons` only (no POST). `Persons` renders mapped list; `Person` displays `name` and `number`.
- Keys: List uses `person.name` as `key` and as uniqueness constraint.

## Developer Workflows

- Dev: `npm run dev` (Vite on `http://localhost:5173`).
- Mock API: `npm run server` (json-server on `http://localhost:3001` from `db.json`).
  - Note: In this branch `App.jsx` fetches `/persons`, so run the server before dev.
- Build: `npm run build` → `dist/`; Preview: `npm run preview`.
- Lint: `npm run lint` (ESLint with React plugins; PropTypes checks disabled).
- Node: README recommends Node v22.x; other versions usually work.

## Conventions & Patterns

- HTTP is inline in `App.jsx` using Axios (no `services/` abstraction in this branch).
- State updates are immutable (e.g., `persons.concat(...)`).
- ESLint config in `eslint.config.js`: React hooks & refresh rules enabled; `react/prop-types` disabled.
- `db.json` has string `id`s; current UI uses `name` for keys/uniqueness.
- No persistence for adds: submit only updates React state, not `db.json`.

## Integration Points

- Mock backend: json-server serving `db.json` with collection `persons` (fields: `name`, `number`, `id`).
- CORS: json-server allows cross-origin; Axios uses absolute URL.
- If you implement persistence, follow json-server endpoints: `POST /persons`, `DELETE /persons/:id`, etc., and prefer using `id` for keys to avoid collisions.

## Examples

- Fetch on mount (from `src/App.jsx`):
  ```js
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);
  ```
- Add with persistence (keep style inline if you extend):
  ```js
  const submit = async (e) => {
    e.preventDefault();
    const person = { name: newName, number: newPhone };
    if (!persons.map((p) => p.name).includes(newName)) {
      const { data } = await axios.post(
        "http://localhost:3001/persons",
        person
      );
      setPersons(persons.concat(data));
      setNewName("");
      setNewPhone("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };
  ```

## File Pointers

- `src/App.jsx`: state + data fetching + submit logic (inline HTTP).
- `src/components/PersonForm.jsx`: controlled inputs.
- `src/components/Persons.jsx` and `src/components/Person.jsx`: list rendering.
- `db.json`: json-server data source.
- `eslint.config.js`, `vite.config.js`: tooling configuration.

## Gotchas

- README mentions starting json-server for certain branches, but this branch fetches from `/persons`; start `npm run server`.
- Using `name` as key can collide; prefer `id` if you change persistence or list keys.
- Port conflicts: Vite `5173`, json-server `3001`. Adjust if occupied.
