import { useState } from 'react';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function saveEdit() {
    const value = draft.trim();
    if (value) onEdit(todo.id, value);
    else setDraft(todo.text);
    setEditing(false);
  }

  return (
    <li className={`${styles.item} ${todo.completed ? styles.done : ''}`}>
      <input
        className={styles.check}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.text} as ${todo.completed ? 'active' : 'completed'}`}
      />
      {editing ? (
        <input
          className={styles.editInput}
          value={draft}
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') saveEdit();
            if (event.key === 'Escape') { setDraft(todo.text); setEditing(false); }
          }}
          autoFocus
          aria-label="Edit task"
        />
      ) : (
        <span className={styles.text}>{todo.text}</span>
      )}
      <div className={styles.actions}>
        {editing ? (
          <button type="button" onClick={saveEdit} aria-label="Save task">Save</button>
        ) : (
          <button type="button" onClick={() => { setDraft(todo.text); setEditing(true); }} aria-label="Edit task">Edit</button>
        )}
        <button type="button" className={styles.delete} onClick={() => onDelete(todo.id)} aria-label="Delete task">Delete</button>
      </div>
    </li>
  );
}