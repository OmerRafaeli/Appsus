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
        const { note } = this.props
        console.log('checked:', checked)
        this.props.onTodoIsDone(checked, todoId, note.id)
    }

    onGetRemovedTodo = (todoId) => {
        const { note } = this.props
        this.props.onRemoveTodo(todoId, note.id)
    }

    render() {
        const { note, onAddTodo } = this.props
        const { todos } = note.info
        // console.log('todos:', todos)

        return <section className="note-todos">
            <h5>{note.info.title}</h5>
            <ul>
                {todos.map(todo => <TodoPreview
                    key={todo.id}
                    todo={todo}
                    handleCheckboxChange={this.handleCheckboxChange}
                    handleTxtChange={this.handleTxtChange}
                    onGetRemovedTodo={this.onGetRemovedTodo} />
                )}
            </ul>
            <AddTodo note={note}
                onAddTodo={onAddTodo} />
        </section>
    }
}