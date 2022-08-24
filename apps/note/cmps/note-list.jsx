import { NotePreview } from './note-preview.jsx';

export function NoteList({ notes, onRemoveNote }) {

    return <section className="note-list">
        {notes.map(note => <NotePreview
            key={note.id}
            note={note}
            onRemoveNote={onRemoveNote}
        />)}
    </section>
}