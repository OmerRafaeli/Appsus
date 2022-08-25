import { AddTodo } from "./add-todo.jsx"

export class NoteTodos extends React.Component {
    render() {
        const { note, onAddTodo } = this.props
        const { todos } = note.info
        console.log('todos:', todos)

        return <section className="note-todos">
            <h5>{note.info.title}</h5>
            <ul>
                {todos.map(todo => {
                    return <li key={todo.id}
                        contentEditable='true'>{todo.txt}</li>
                })}
            </ul>
            <AddTodo note={note}
                onAddTodo={onAddTodo} />
        </section>
    }
}