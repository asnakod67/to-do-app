# Redux Implementation Steps

## Task
Refactor the Todo app to use Redux for global state management.

## Implementation Checklist

- [ ] Install `@reduxjs/toolkit` and `react-redux`.
- [ ] Create a `todos` slice with reducers for todo actions.
- [ ] Configure the Redux store and provide it to the app.
- [ ] Replace local `useState` with Redux selectors.
- [ ] Dispatch Redux actions from UI components.

## Suggested Implementation

### 1. Install dependencies

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Create the todos slice

Create `src/features/todos/todosSlice.js`. Define the initial todos state and reducers for adding, deleting, toggling, and editing todos.

### 3. Configure the store

Create `src/app/store.js` and register the todos reducer with `configureStore`.

### 4. Provide the store

Wrap the application with React Redux's `Provider` and pass it the configured store.

### 5. Update components

Use `useSelector` to read todos from the Redux store and `useDispatch` to dispatch actions when users interact with the Todo UI.

## Completion Checks

- [ ] The app starts without Redux-related errors.
- [ ] Todos can be added, edited, completed, and deleted.
- [ ] Todo state is read from Redux, not duplicated in component-level `useState`.
- [ ] All relevant UI components dispatch Redux actions.
