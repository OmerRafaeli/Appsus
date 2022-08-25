import { NoteImg } from './note-img.jsx'
import { NoteTodos } from './note-todos.jsx'
import { NoteTxt } from './note-txt.jsx'
import { NoteVideo } from './note-video.jsx'
import { noteService } from '../services/note.service.js'
import { UserBtns } from './user-btns.jsx'


export class NotePreview extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        // console.log('im load');
        const noteId = this.props.note.id
        noteService.getNoteById(noteId)
            .then(note => { this.setState({ note }) })
    }



    onChangeTxt = (textContent, noteId) => {
        noteService.editTxt(textContent, noteId)
            .then(() => this.loadNote())
    }

    onAddTodo = (todo, noteId) => {
        noteService.addTodo(todo, noteId)
            .then(() => this.loadNote())
    }

    onChangeColor = (backgroundColor, noteId) => {
        noteService.changeNoteColor(backgroundColor, noteId)
            .then(() => this.loadNote())

    }

    render() {
        const { note } = this.state
        if (!note) return
        // console.log('this.state.note:', this.state.note)
        const { onRemoveNote, onAddNote } = this.props
        const { txt, url } = note.info
        const { backgroundColor } = note
        const { onChangeTxt, onChangeColor, onAddTodo } = this
        console.log('backgroundColor:', backgroundColor)
        function DynamicCmp() {
            switch (note.type) {
                case 'note-txt':
                    return <NoteTxt onChangeTxt={onChangeTxt} note={note} txt={txt} />
                case 'note-img':
                    return <NoteImg note={note} url={url} />
                case 'note-todos':
                    return <NoteTodos note={note} onAddTodo={onAddTodo} />
                case 'note-video':
                    return <NoteVideo note={note} url={url} />
            }
        }

        return <section className="note-preview" style={{ backgroundColor }}>

            <DynamicCmp />
            <UserBtns note={note}
                onChangeColor={onChangeColor}
                onRemoveNote={onRemoveNote}
                onAddNote={onAddNote} />
        </section>
    }
}
