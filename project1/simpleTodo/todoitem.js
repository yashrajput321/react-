// TodoItem.js

const TodoItem = props => {
    const {itemsDetails, deleteTodo} = props
    const {id, title} = itemsDetails
  
    const onDeleteTodo = () => {
      deleteTodo(id)
    }
  
    return (
      <li>
        <p>{title}</p>
        <button type="button" onClick={onDeleteTodo}>
          Delete
        </button>
      </li>
    )
  }
  
  export default TodoItem
  