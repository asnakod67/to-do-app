import { useEffect, useMemo, useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import styles from './App.module.css';

const STORAGE_KEY = 'taskflow-todos';

function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(current => [newTodo, ...current]);
  }

  function toggleTodo(id) {
    setTodos(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(current => current.filter(todo => todo.id !== id));
  }

  function editTodo(id, text) {
    setTodos(current =>
      current.map(todo => todo.id === id ? { ...todo, text } : todo)
    );
  }

  function clearCompleted() {
    setTodos(current => current.filter(todo => !todo.completed));
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(todo => !todo.completed);
    if (filter === 'completed') return todos.filter(todo => todo.completed);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter(todo => !todo.completed).length;
  const completed = todos.length - remaining;

  return (
    <main className={styles.page}>
      <section className={styles.app}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>YOUR PERSONAL WORKSPACE</p>
            <h1>Task<span>Flow</span></h1>
            <p className={styles.subtitle}>A little progress every day adds up.</p>
          </div>
          <div className={styles.date}>
            {new Intl.DateTimeFormat('en', {
              weekday: 'short', month: 'short', day: 'numeric'
            }).format(new Date())}
          </div>
        </header>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{todos.length}</span>
            <span className={styles.statLabel}>Total tasks</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{remaining}</span>
            <span className={styles.statLabel}>Remaining</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{completed}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>

        <TodoForm onAdd={addTodo} />

        <div className={styles.listHeader}>
          <div>
            <h2>Your tasks</h2>
            <p>Keep your next steps clear and manageable.</p>
          </div>
          <div className={styles.filters} aria-label="Filter tasks">
            {['all', 'active', 'completed'].map(option => (
              <button
                key={option}
                type="button"
                className={`${styles.filterButton} ${filter === option ? styles.selected : ''}`}
                onClick={() => setFilter(option)}
              >
                {option[0].toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {completed > 0 && (
          <div className={styles.footer}>
            <span>{completed} task{completed === 1 ? '' : 's'} completed</span>
            <button type="button" onClick={clearCompleted}>Clear completed</button>
          </div>
        )}
      </section>
      <p className={styles.credit}>Built with React Hooks and browser local storage.</p>
    </main>
  );
}