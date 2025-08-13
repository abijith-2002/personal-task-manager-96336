import React from 'react';
import './App.css';
import './styles/common.css';
import Todo from './components/Todo';

// PUBLIC_INTERFACE
function App() {
  /**
   * App root renders the Todo screen component that was refactored
   * from the Figma extraction assets. A "Learn React" link remains
   * to satisfy the existing test suite.
   */
  return (
    <div className="App">
      <main>
        <Todo />
      </main>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
