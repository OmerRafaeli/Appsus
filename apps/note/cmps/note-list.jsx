import { NotePreview } from './note-preview.jsx';

export function NoteList({ notes, onRemoveNote, onAddNote,onChangeNotePin }) {

    return <React.Fragment>
        <section className="note-list">

            <h3>pinned</h3>
            {notes.map(note => note.isPinned && <NotePreview
                key={note.id}
                note={note}
                onRemoveNote={onRemoveNote}
                onAddNote={onAddNote}
                onChangeNotePin={onChangeNotePin}
            />)}
        </section>
        <section className="note-list">

            <h3>other</h3>
            {notes.map(note => !note.isPinned && <NotePreview
                key={note.id}
                note={note}
                onRemoveNote={onRemoveNote}
                onAddNote={onAddNote}
                onChangeNotePin={onChangeNotePin}
            />)}
        </section>
    </React.Fragment>

}