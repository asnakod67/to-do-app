import { useState } from 'react';
import styles from './TodoForm.module.css';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder="What needs to get done?"
        aria-label="New task"
        maxLength={120}
      />
      <button type="submit" disabled={!text.trim()}>Add task <span>＋</span></button>
    </form>
  );
}