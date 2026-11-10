
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";
import "./components/Todo.css";

function App() {
  // Local Storage se todos load karo
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  // Todos change hone par Local Storage update karo
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Complete Todo
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  // Filter Todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  const activeCount = todos.length - completedCount;

  return (
    <div className="app-container">
      <div className="todo-card">

        <header className="todo-header">
          <p className="subtitle">MY PRODUCTIVITY</p>
          <h1>My Todo List ✨</h1>
          <p className="description">
            Organize your day, one task at a time.
          </p>
        </header>

        <div className="stats">
          <div className="stat-box">
            <h2>{todos.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-box">
            <h2>{activeCount}</h2>
            <p>Pending</p>
          </div>

          <div className="stat-box">
            <h2>{completedCount}</h2>
            <p>Completed</p>
          </div>
        </div>

        <TodoForm onAdd={addTodo} />

        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "active-filter" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

        <footer className="todo-footer">
          <p>✨ Stay focused. Keep growing!</p>
          <span>Data saved automatically</span>
        </footer>

      </div>
    </div>
  );
}

export default App;
