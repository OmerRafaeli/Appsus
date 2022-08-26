import { createEmail } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
const { Link, withRouter } = ReactRouterDOM

export class UserBtns extends React.Component {

    state = {
        isColorOn: false
    }
    onShowColors = () => {
        // console.log('btn!!!!');
        this.setState({ isColorOn: !this.state.isColorOn })
    }
    onGetColor = (ev) => {
        const { backgroundColor } = ev.target.style

        const { note } = this.props
        this.setState({ isColorOn: !this.state.isColorOn })
        this.props.onChangeColor(backgroundColor, note.id)
    }

    onDuplicateNote = () => {
        const { note } = this.props
        const { type,backgroundColor } = note
        if (type === 'note-video' || type === 'note-img') {
            noteService.creatNote(type, backgroundColor,note.info.url)
                .then(note => {
                    this.props.onAddNote(note)
                })
        } else if (type === 'note-todos') {
            noteService.creatNote(type, backgroundColor,note.info.title,'', note.info.todos)
                .then(note => {
                    this.props.onAddNote(note)
                })
        } else {
            noteService.creatNote(type, backgroundColor,note.info.txt)
                .then(note => {
                    this.props.onAddNote(note)
                })
        }

    }

    onTogglePin = () => {
        const { note } = this.props
        note.isPined = !note.isPined
        this.props.onChangeNotePin(note.id)
    }

    onCreateEmail = () => {
        const { note } = this.props
        createEmail(note)
    }

    render() {

        const { onShowColors, onGetColor, onDuplicateNote,
            onTogglePin, onCreateEmail } = this
        const { isColorOn } = this.state
        const { note, onRemoveNote } = this.props
        // console.log('note:', note)
        // console.log('isColorOn:', isColorOn)
        return <section className="user-btns">
            <div onClick={onTogglePin}><i className="fa-solid fa-thumbtack"></i></div>
            <Link to="/mail"> <div onClick={onCreateEmail}><i className="fa-solid fa-envelope"></i></div></Link>
            <div onClick={onDuplicateNote}><i className="fa-solid fa-paste"></i></div>
            <div onClick={onShowColors}><i className="fa-solid fa-palette" ></i></div>
            <div onClick={() => onRemoveNote(note.id)}> <i className="fa-solid fa-trash"></i></div>
            {isColorOn && <div className="color-pick">
                <div className="picked-color" style={{ backgroundColor: 'rgb(243, 114, 140)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(213, 114, 243)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(155, 114, 243)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(114, 161, 243)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(114, 243, 222)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(151, 243, 114)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(243, 193, 114)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(245, 166, 166)' }} onClick={onGetColor}></div>
            </div>}
        </section>
    }
}