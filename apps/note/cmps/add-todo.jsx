import { noteService } from "../services/note.service.js"


export function AddTodo({ note, onAddTodo }) {

    function onCreateTodo(ev) {
        const { value } = ev.target

        if (value === '') return
        else {
            const newTodo = noteService.createTodo(value)
            onAddTodo(newTodo, note.id)
            console.log('newTodo:', newTodo)
        }
    }

    return <section>
        <form onBlur={onCreateTodo}>
            <input type="text"
                placeholder="Add todo here"
            />
        </form>
    </section>

}
