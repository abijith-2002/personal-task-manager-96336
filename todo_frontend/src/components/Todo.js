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
   * This React component renders the Todo screen extracted from Figma
   * updated to fill the entire viewport. The layout uses a fixed header
   * and footer with a scrollable task list in the middle area so that
   * only the tasks scroll when there are many items.
   *
   * Interactions: toggle completion, delete task, add task.
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

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const addTask = useCallback(() => {
    setTasks(prev => {
      // Ensure unique, increasing index even after deletions
      const nextIndex =
        prev.reduce((max, t) => {
          const m = /(\d+)$/.exec(t.id);
          return Math.max(max, m ? parseInt(m[1], 10) : 0);
        }, 0) + 1;

      const id = `task_item_${nextIndex}`;
      return [
        ...prev,
        { id, title: `New task #${nextIndex}`, completed: false }
      ];
    });
  }, []);

  return (
    <section className="todo-canvas" aria-label="Todo Screen">
      {/* Header */}
      <header className="todo-header">
        <div className="todo-header__content">
          <h1 className="todo-title ds-heading">Tasks</h1>
          <p className="todo-subtitle ds-subtext" aria-live="polite">
            {summaryText}
          </p>
        </div>
      </header>

      {/* Tasks (scrollable area) */}
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
              <button
                type="button"
                className="btn delete-btn"
                aria-label={`Delete ${task.title}`}
                title="Delete task"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Footer (fixed) */}
      <footer className="todo-footer" aria-label="Todo footer">
        <div className="todo-footer__content">
          <span className="ds-subtext">{summaryText}</span>
        </div>
      </footer>

      {/* Floating Add Button (stays visible; positioned above footer) */}
      <button
        type="button"
        className="fab btn"
        aria-label="Add new task"
        title="Add"
        onClick={addTask}
      >
        <span className="fab__plus" aria-hidden="true" />
      </button>
    </section>
  );
}
