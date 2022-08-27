import { noteService } from "../services/note.service.js"


export function AddTodo({ note, onAddTodo }) {

    function onCreateTodo(ev) {
        ev.preventDefault()
        const { value } = ev.target

        if (value === '') return
        else {
            const newTodo = noteService.createTodo(value)
            onAddTodo(newTodo, note.id)
            console.log('value:', value)
            // console.log('newTodo:', newTodo)
        }
    }

    return <section className="add-todo">
        <form  onBlur={onCreateTodo}>
            <input type="text"
                placeholder="Add todo here"
            />
        </form>
    </section>

}
