import PropTypes from 'prop-types';
import useInput from './hooks/useInput';
import styled from 'styled-components';

const TodoListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0.25rem 0;
`;

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.4s ease-in-out;

  &:focus-within,
  &:hover {
    background-color: rgba(104, 128, 144, 0.05);
  }
`;

const TodoItemCheckbox = styled.input`
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  border-color: #688090;
  border-radius: 0.25rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const TodoName = styled.label`
  flex-grow: 1;
  font-size: 1.25rem;
  word-break: break-word;
  transition: all 1s ease;

  ${props => props.$isCompleted && `
    color: rgba(104, 128, 144, .5);
    text-decoration: line-through;
  `}
`;

const EditingTodoInput = styled.input`
  appearance: none;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #688090;
  flex-grow: 1;
  font-size: 1.25rem;
`;

const DeleteTodoButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  color: #688090;
  font-size: 1.75rem;
`;

function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsCompleted,
  handleEditingTodo,
  handleEditingTodoBlur,
  handleEditingTodoKeyDown,
}) {
  const { handleInputChange } = useInput();

  const handleCheckboxClick = () => {
    handleToggleIsCompleted(todo.id);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  const handleTodoClick = () => {
    handleEditingTodo(todo.id);
  };

  return (
    <TodoListItem>
      <TodoItemWrapper>
        <TodoItemCheckbox
          type="checkbox"
          defaultChecked={todo.isCompleted}
          onClick={handleCheckboxClick}
        />
        {todo.isEditing ? (
          <EditingTodoInput
            minLength={1}
            maxLength={64}
            defaultValue={todo.content}
            onChange={handleInputChange}
            onBlur={handleEditingTodoBlur}
            onKeyDown={handleEditingTodoKeyDown}
          />
        ) : (
          <TodoName $isCompleted={todo.isCompleted} onClick={handleTodoClick}>
            {todo.content}
          </TodoName>
        )}
      </TodoItemWrapper>
      <DeleteTodoButton onClick={handleDeleteClick}>&times;</DeleteTodoButton>
    </TodoListItem>
  );
}

TodoItem.propTypes = {
  className: PropTypes.string,
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isCompleted: PropTypes.bool,
    isEditing: PropTypes.bool,
  }),
  handleDeleteTodo: PropTypes.func,
  handleToggleIsCompleted: PropTypes.func,
  handleEditingTodo: PropTypes.func,
  handleEditingTodoBlur: PropTypes.func,
  handleEditingTodoKeyDown: PropTypes.func,
};

export default TodoItem;
