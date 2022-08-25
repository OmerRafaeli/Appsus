import { AddNote } from '../cmps/add-note.jsx';
import { NoteList } from '../cmps/note-list.jsx';
import { NotesFilter } from '../cmps/notes-filter.jsx';
import { noteService } from '../services/note.service.js';

export class NoteIndex extends React.Component {

    state = {
        notes: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(notes => {
                this.setState({ notes })
                // console.log('notes:', notes)
            })
    }

    onSetFilter = (filterBy) => {
        console.log('filterBy:', filterBy)
        this.setState({ filterBy }, () => {
            this.loadNotes()
        })
    }

    onAddNote = (note) => {
        // console.log('note:', note)
        noteService.addNote(note)
            .then(note => this.setState({ notes: [note, ...this.state.notes] }))
    }

    onRemoveNote = (noteId) => {
        // console.log('noteId:', noteId)
        noteService.removeNote(noteId)
            .then(() => {
                const notes = this.state.notes.filter(note => note.id !== noteId)
                this.setState({ notes })
                // showSuccessMsg('Note removed')
            })
    }
    onChangeNotePin = (noteId) => {
        // console.log('note:', note)
        noteService.changeNotePin(noteId)
            .then((notes) => this.setState({ ...this.state, notes }))
           
    }

    render() {
        const { notes } = this.state
        return <section className="note-index">
            <NotesFilter onSetFilter={this.onSetFilter} />
            <AddNote onAddNote={this.onAddNote} />
            <NoteList notes={notes}
                onRemoveNote={this.onRemoveNote}
                onAddNote={this.onAddNote}
                onChangeNotePin={this.onChangeNotePin} />
        </section>

    }
}
