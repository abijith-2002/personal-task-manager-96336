import React, { useMemo, useState, useCallback } from 'react';
import './Todo.css';

/**
 * INTERNAL: Initial tasks derived from Figma/HTML extraction.
 * Matches the content and completion states from assets/Todo.html.
 */
const initialTasks = [
  { id: 'task_item_1', title: 'Implement Figma design', completed: false },
  { id: 'task_item_2', title: 'Fix UI bugs', completed: false },
  { id: 'task_item_3', title: 'Test features', completed: false },
  { id: 'task_item_4', title: 'Add SVG icons', completed: true },
];

// PUBLIC_INTERFACE
export default function Todo() {
  /**
   * This React component renders the Todo screen extracted from Figma,
   * including header, task list, and a floating add button. It ports the
   * interactions from assets/app.js to React: toggling completion and adding tasks.
   */
  const [tasks, setTasks] = useState(initialTasks);

  const completedCount = useMemo(
    () => tasks.filter(t => t.completed).length,
    [tasks]
  );

  const summaryText = useMemo(
    () => `${completedCount} of ${tasks.length} completed`,
    [completedCount, tasks.length]
  );

  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const addTask = useCallback(() => {
    setTasks(prev => {
      const nextIndex = prev.length + 1;
      const id = `task_item_${nextIndex}`;
      return [
        ...prev,
        { id, title: `New task #${nextIndex}`, completed: false }
      ];
    });
  }, []);

  return (
    <main className="todo-canvas" role="main" aria-label="Todo Screen">
      {/* Header */}
      <header className="todo-header">
        <div className="todo-header__content">
          <h1 className="todo-title ds-heading">Tasks</h1>
          <p className="todo-subtitle ds-subtext" aria-live="polite">
            {summaryText}
          </p>
        </div>
      </header>

      {/* Tasks */}
      <section className="todo-tasks" aria-label="Task list">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`task-item${task.completed ? ' completed' : ''}`}
            data-id={task.id}
          >
            <div className="task-item__left">
              {/* Use button for accessibility; visually styled as a dot */}
              <button
                type="button"
                className="btn status-dot"
                aria-pressed={task.completed}
                aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTask(task.id);
                }}
                title={task.completed ? 'Completed' : 'Not completed'}
              />
            </div>
            <div className="task-item__title">
              {task.title}
            </div>
            <div className="task-item__right">
              <div className="more-vector" aria-hidden="true" />
            </div>
          </div>
        ))}
      </section>

      {/* Floating Add Button */}
      <button
        type="button"
        className="fab btn"
        aria-label="Add new task"
        title="Add"
        onClick={addTask}
      >
        <span className="fab__plus" aria-hidden="true" />
      </button>
    </main>
  );
}
