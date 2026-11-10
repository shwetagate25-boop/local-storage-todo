
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>

      <button
        className="complete-btn"
        onClick={() => onToggle(todo.id)}
        aria-label="Toggle task completion"
      >
        {todo.completed ? "✓" : ""}
      </button>

      <span className="todo-text">
        {todo.text}
      </span>

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        🗑️
      </button>

    </div>
  );
}

export default TodoItem;
