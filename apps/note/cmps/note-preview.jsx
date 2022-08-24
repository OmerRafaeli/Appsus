import { NoteImg } from './note-img.jsx'
import { NoteTodos } from './note-todos.jsx'
import { NoteTxt } from './note-txt.jsx'
import { NoteVideo } from './note-video.jsx'
import { noteService } from '../services/note.service.js'
import { UserBtns } from './user-btns.jsx'


export class NotePreview extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const noteId = this.props.note.id
        noteService.getNoteById(noteId)
            .then(note => { this.setState({ note }) })
    }

    onSetTxt = (userTxt) => {

        this.setState((prevState) => ({
            note: {
                ...prevState.note,
                info: {
                    ...prevState.note.info,
                    txt: userTxt
                }
            }
        }), () => {
            this.loadNote()
        })
        // console.log('this.state.txt:', this.state.txt)
        // console.log('userTxt:', userTxt)
    }

    onChangeColor = (backgroundColor) => {
        console.log('backgroundColor:', backgroundColor)
        this.setState({ backgroundColor }, () => {
            this.loadNote()
        })
    }

    render() {
        const { note } = this.state
        // console.log('this.state.note:', this.state.note)
        if (!note) return
        const { txt, url } = note.info
        const { backgroundColor } = note
        const { onSetTxt, onChangeColor } = this
        console.log('backgroundColor:', backgroundColor)
        function DynamicCmp(props) {
            switch (note.type) {
                case 'note-txt':
                    return <NoteTxt onSetTxt={onSetTxt} note={note} txt={txt} />
                case 'note-img':
                    return <NoteImg note={note} url={url} />
                case 'note-todos':
                    return <NoteTodos note={note} />
                case 'note-video':
                    return <NoteVideo note={note} url={url} />
            }
        }

        return <section className="note-preview">

            <DynamicCmp style={{ backgroundColor }} />
            <UserBtns note={note} onChangeColor={onChangeColor} />
        </section>
    }
}
