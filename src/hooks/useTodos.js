import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import useInput from './useInput';

function addTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

export default function useTodos() {
  const {
    inputValue: newTodo,
    setInputValue: setNewTodo,
    handleInputChange,
  } = useInput();

  const id = useRef(1);

  const [todos, setTodos] = useState(() => {
    let todoData = JSON.parse(window.localStorage.getItem('todos'));

    if (todoData && todoData[0] !== undefined) {
      id.current = todoData[0].id + 1;
      return todoData;
    }

    return [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    addTodosToLocalStorage(todos);
  }, [todos]);

  const handleNewTodo = () => {
    setTodos([
      {
        id: id.current,
        content: newTodo.trim(),
        isCompleted: false,
        isEditing: false,
      },
      ...todos,
    ]);
    setNewTodo('');
    id.current++;
  };

  const handleNewTodoClick = () => {
    if (newTodo.trim() !== '') {
      handleNewTodo();
    }
  };

  const handleNewTodoKeyDown = (event) => {
    if (newTodo.trim() !== '' && event.key === 'Enter') {
      handleNewTodo();
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClearCompletedTodos = () => {
    setTodos(todos.filter((todo) => todo.isCompleted === false));
  };

  const handleToggleIsCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      })
    );
  };

  const updateTodo = (data) => {
    setTodos(
      todos.map((todo) => {
        if (!todo.isEditing) return todo;
        return {
          ...todo,
          ...data,
        };
      })
    );
  };

  const handleEditingTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return {
          ...todo,
          isEditing: !todo.isEditing,
        };
      })
    );
  };

  const handleEditingTodoBlur = (event) => {
    if (event.target.value === '') return;

    updateTodo({
      content: event.target.value.trim(),
      isEditing: false,
    });
  };

  const handleEditingTodoKeyDown = (event) => {
    if (event.target.value === '') return;

    if (event.key === 'Escape' || event.key === 'Esc') {
      updateTodo({ isEditing: false });
    }

    if (event.key === 'Enter') {
      updateTodo({
        content: event.target.value.trim(),
        isEditing: false,
      });
    }
  };

  const updateFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'all') return true;
      return filter === 'uncompleted' ? !todo.isCompleted : todo.isCompleted;
    });
  }, [todos, filter]);

  return {
    todos: filteredTodos,
    newTodo,
    filter,
    updateFilter,
    handleNewTodoClick,
    handleNewTodoKeyDown,
    handleInputChange,
    handleToggleIsCompleted,
    handleDeleteTodo,
    handleClearCompletedTodos,
    handleEditingTodo,
    handleEditingTodoBlur,
    handleEditingTodoKeyDown,
  };
}
