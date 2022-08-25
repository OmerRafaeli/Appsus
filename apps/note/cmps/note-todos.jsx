import { noteService } from "../services/note.service.js"
import { AddTodo } from "./add-todo.jsx"
import { TodoPreview } from "./todo-preview.jsx"

export class NoteTodos extends React.Component {


    handleTxtChange = (ev, todoId) => {
        const { textContent } = ev.target
        const { note } = this.props
        this.props.onChangeTxt(textContent, note.id, note.type, todoId)
    }

    handleCheckboxChange = (ev, todoId) => {
        const { checked } = ev.target
        this.props.onTodoIsDone(checked, todoId)

    }

    doneClass = () => {
        const { note } = this.props
        //         noteService.getTodoById(note.id,)
        // const className = 
    }


    render() {
        const { note, onAddTodo } = this.props
        const { todos } = note.info
        console.log('todos:', todos)

        return <section className="note-todos">
            <h5>{note.info.title}</h5>
            <ul>
                {todos.map(todo => <TodoPreview
                    key={todo.id}
                    todo={todo}   />
                )}
            </ul>
            <AddTodo note={note}
                onAddTodo={onAddTodo} />
        </section>
    }
}