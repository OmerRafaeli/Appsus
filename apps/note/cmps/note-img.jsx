
export class NoteImg extends React.Component {

    state = {
        url: this.props.url,
        title: this.props.note.info.title
    }

    render() {
        const { url, title } = this.state
        return <section className="note-img">
            <img src={url} alt={title} />
        </section>
    }
}