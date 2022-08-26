
export function TodoPreview({ handleCheckboxChange, handleTxtChange, onGetRemovedTodo, todo }) {

    // console.log('todo.isDone:', todo.isDone)
    return <li className="todo-preview">
        <input type="checkbox"
            id="check-todo"
            onChange={() => handleCheckboxChange(event, todo.id)} />
        <span className={todo.isDone ? 'done' : ''}
            contentEditable='true' suppressContentEditableWarning
            onBlur={() => handleTxtChange(event, todo.id)}>{todo.txt}</span>
        <div className="btn-remove-todo" onClick={() => onGetRemovedTodo(todo.id)}>
            <i className="fa-solid fa-xmark"></i></div></li>
}