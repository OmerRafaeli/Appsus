import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export class AddNote extends React.Component {
    unsubscribe
    state = {
        enterTxt: 'Add a new Note',
        type: 'note-txt',
        txt: ''
    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('mail-to-note', (email) => {
            console.log('email:', email)
            const { subject, body } = email
            this.onCreateNote('note-txt', body, subject)
        })
    }



    onHandleChange = (ev) => {
        const value = ev.target.value
        // console.log('value:', value)
        this.setState((prevState) => ({
            ...prevState,
            txt: value
        }))
    }

    onGetType = (type) => {
        switch (type) {
            case 'note-txt':
                this.setState({ enterTxt: 'Add a new Note', type })
                break
            case 'note-img':
                this.setState({ enterTxt: 'Write img url here', type })
                break
            case 'note-todos':
                this.setState({ enterTxt: 'Add a new Todo list', type })
                break
            case 'note-video':
                this.setState({ enterTxt: 'Write video url here', type })
                break
            case 'note-canvas':
                this.setState({ enterTxt: 'Canvas title here', type })
        }
    }

    onCreateNote = (type, txt, title) => {
        if (!txt) return
        // console.log('type:', type)
        // console.log('txt:', txt)
        noteService.createNote(type, 'rgb(155, 114, 243)', txt, title)
            .then(note => {
                this.props.onAddNote(note)
            })
        this.setState({
            enterTxt: 'Add a new Note',
            type: 'note-txt',
            txt: ''
        })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        console.log('ev:', ev)
        this.onCreateNote(this.state.type, this.state.txt)
        // console.log('target:', target)
    }


    render() {
        const { onGetType, onHandleChange, onCreateNote, onSubmit } = this
        const { enterTxt, type, txt } = this.state
        // const { onAddNote } = this.props
        // console.log('enterTxt:', enterTxt)
        // console.log('type:', type)
        return <section className="add-note">
            <div className="note-input">
                <form onSubmit={onSubmit} onBlur={() => onCreateNote(type, txt)}>
                    <label htmlFor="add-note"></label>
                    <input type="text"
                        id="add-note"
                        name="add-note"
                        placeholder={enterTxt}
                        value={txt}
                        onChange={onHandleChange} />
                    <div className="btns-input">
                        <button onClick={() => onGetType('note-txt')}><i className="fa-solid fa-comment"></i></button>
                        <button onClick={() => onGetType('note-img')}><i className="fa-solid fa-image"></i></button>
                        <button onClick={() => onGetType('note-todos')}><i className="fa-solid fa-list"></i></button>
                        <button onClick={() => onGetType('note-video')}><i className="fa-brands fa-youtube"></i></button>
                        <button onClick={() => onGetType('note-canvas')}><i className="fa-brands fa-youtube"></i></button>
                    </div>
                </form>
            </div>
        </section>
    }
}