import { NotePreview } from './note-preview.jsx';

export function NoteList({ notes, onRemoveNote, onAddNote,onChangeNotePin }) {

    return <React.Fragment>
            <h3 >Pinned Notes</h3>
        <section className="note-list">

            {notes.map(note => note.isPinned && <NotePreview
                key={note.id}
                note={note}
                onRemoveNote={onRemoveNote}
                onAddNote={onAddNote}
                onChangeNotePin={onChangeNotePin}
            />)}
        </section>
            <h3 >Other Notes</h3>
        <section className="note-list ">

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