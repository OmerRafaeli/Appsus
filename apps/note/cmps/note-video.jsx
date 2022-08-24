
export class NoteVideo extends React.Component {

    state = {
        url: this.props.url,
        title:this.props.note.info.title
    }

    render() {
        const { url } = this.state
        return <section className="note-video">
            <iframe src={url}></iframe>
        </section>
    }
}