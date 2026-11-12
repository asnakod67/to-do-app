import TodoItem from './TodoItem.jsx';
import styles from './TodoList.module.css';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>✓</div>
        <h3>Nothing on this list</h3>
        <p>Add a task above or try another filter.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}