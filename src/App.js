import React from 'react';
import useTodos from './hooks/useTodos';
import TodoItem from './TodoItem';
import styled, { createGlobalStyle } from 'styled-components';
import './style/main.min.css';

const GlobalStyle = createGlobalStyle`
  body {
    padding-top: 8rem;
    background-color: #fff;
    color: #688090;

    @media (max-width: 32em) {
      display: grid;
      place-items: center;
      padding: 0;
      margin: 4rem 0;
    }
  }
`;

const AppContainer = styled.div`
  max-width: 36rem;
  padding: 3rem 2.5rem 2.5rem;
  border-radius: 1.5rem;
  margin: 0 auto;
  box-shadow: 0 0 2rem rgba(104, 128, 144, 0.25);
  transition: all 0.4s ease-in-out;

  &:focus-within {
    box-shadow: 0 0 1rem rgba(104, 128, 144, 0.25);
  }

  @media (max-width: 32em) {
    padding: 2.25rem 1.5rem 1.5rem;
  }
`;

const NewTodoInputWrapper = styled.header`
  display: flex;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(104, 128, 144, 0.25);
  margin-bottom: 1.5rem;
`;

const NewTodoInput = styled.input`
  flex-grow: 1;
  appearance: none;
  background: none;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(104, 128, 144, 0.25);
  border-radius: 64rem;
  color: #688090;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.4s ease-in-out;

  &:focus {
    background-color: #fff;
    border-color: #688090;
    outline: none;
  }
`;

const Button = styled.button`
  border: 1px solid transparent;
  border-radius: 64rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.4s ease-in-out;

  &:focus,
  &:hover {
    outline: none;
  }
`;

const AddTodoButton = styled(Button)`
  margin-left: 1rem;
  border-color: #688090;
  color: #688090;

  &:focus,
  &:hover {
    background-color: #688090;
    color: #fff;
  }
`;

const ClearButton = styled(Button)`
  border-color: #db7093;
  color: #db7093;

  &:focus,
  &:hover {
    background: #db7093;
    color: #fff;
  }
`;

const FilterButton = styled(Button)`
  background: ${(props) => (props.$isActive ? '#688090' : 'none')};
  color: ${(props) => (props.$isActive ? '#fff' : '#688090')};

  &:focus,
  &:hover {
    border-color: #688090;
  }
`;

const ClearButtonWrapper = styled.div`
  text-align: right;
`;

const FilterWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const TodoList = styled.ul`
  max-height: 20rem;
  margin-bottom: 1rem;
  overflow: auto;
`;

export default function App() {
  const {
    todos,
    newTodo,
    filter,
    handleNewTodoClick,
    handleNewTodoKeyDown,
    handleInputChange,
    handleToggleIsCompleted,
    handleDeleteTodo,
    handleClearCompletedTodos,
    handleEditingTodo,
    handleEditingTodoBlur,
    handleEditingTodoKeyDown,
    updateFilter,
  } = useTodos();

  return (
    <AppContainer>
      <GlobalStyle />

      <NewTodoInputWrapper>
        <NewTodoInput
          minLength={1}
          maxLength={64}
          value={newTodo}
          onChange={handleInputChange}
          onKeyDown={handleNewTodoKeyDown}
        />
        <AddTodoButton onClick={handleNewTodoClick}>Add</AddTodoButton>
      </NewTodoInputWrapper>

      <FilterWrapper>
        <FilterButton
          onClick={() => updateFilter('all')}
          $isActive={filter === 'all'}
        >
          All
        </FilterButton>
        <FilterButton
          onClick={() => updateFilter('uncompleted')}
          $isActive={filter === 'uncompleted'}
        >
          Uncompleted
        </FilterButton>
        <FilterButton
          onClick={() => updateFilter('completed')}
          $isActive={filter === 'completed'}
        >
          Completed
        </FilterButton>
      </FilterWrapper>

      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleIsCompleted={handleToggleIsCompleted}
            handleEditingTodo={handleEditingTodo}
            handleEditingTodoBlur={handleEditingTodoBlur}
            handleEditingTodoKeyDown={handleEditingTodoKeyDown}
          />
        ))}
      </TodoList>

      <ClearButtonWrapper>
        <ClearButton onClick={handleClearCompletedTodos}>Clear</ClearButton>
      </ClearButtonWrapper>
    </AppContainer>
  );
}
