
export function TodoPreview({ handleCheckboxChange, handleTxtChange,todo }) {


    return <li key={todo.id}>
        <input type="checkbox"
            id="check-todo"
            onChange={() => handleCheckboxChange(event, todo.id)} />
        <span 
            contentEditable='true'
            onBlur={() => handleTxtChange(event, todo.id)}>{todo.txt}</span></li>
}