import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
import { NoteTxt } from "./note-txt.jsx"
import { NoteVideo } from "./note-video.jsx"


export class NotePreview extends React.Component {
    state = {
        txt: null,
        img: null,
        todos: null,
        video: null,
        bgColor: null
    }

    onSetTxt = (userTxt) => {
        this.setState({ txt: userTxt })
        console.log('this.state.txt:', this.state.txt)
    }

    render() {
        const { note } = this.props
        console.log('note:', note)
        const { onSetTxt } = this
        function DynamicCmp(props) {
            switch (note.type) {
                case 'note-txt':
                    return <NoteTxt onSetTxt={onSetTxt} note={note} />
                case 'note-img':
                    return <NoteImg note={note} />
                case 'note-todos':
                    return <NoteTodos note={note} />
                case 'note-video':
                    return <NoteVideo note={note} />
            }
        }

        return <section className="note-preview">

            <DynamicCmp />
        </section>
    }
}
