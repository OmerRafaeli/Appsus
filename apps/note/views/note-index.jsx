import { AddNote } from '../cmps/add-note.jsx';
import { NoteList } from '../cmps/note-list.jsx';
import { noteService } from '../services/note.service.js';

export class NoteIndex extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.setState({ notes })
                // console.log('notes:', notes)
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

    // addDuplicateNote = (note) => {
    //     console.log('note duplicate:', note)
    // }

    render() {
        const { notes } = this.state
        return <section className="note-index">
            <AddNote onAddNote={this.onAddNote} />
            <NoteList notes={notes}
                onRemoveNote={this.onRemoveNote}
                onAddNote={this.onAddNote} />
        </section>

    }
}
