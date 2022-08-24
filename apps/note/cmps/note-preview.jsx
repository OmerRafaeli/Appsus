

export class NotePreview extends React.Component {


    render() {
        const { note } = this.props
        
        return <section className="note-preview">
            <h3>{note.id}</h3>
        </section>
    }
}