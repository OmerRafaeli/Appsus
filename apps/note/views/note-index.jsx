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

    render() {
        const { notes } = this.state
        return <section className="note-index">
            <NoteList notes={notes} />
        </section>

    }
}
