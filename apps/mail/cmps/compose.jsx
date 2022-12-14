import { EmailService } from "../services/mail.service.js"
import { createNote, eventBusService } from '../../../services/event-bus.service.js'
const { Link } = ReactRouterDOM

export class Compose extends React.Component {
    unsubscribe
    state = {
        emailContent: {

            to: '',
            subject: '',
            message: '',
            sentAt: null,
            isRead: true,
            sentAt: '',
            isImportant: false,
            isSent: true,
        }
    }


    componentDidMount() {
        const { emailContent } = this.state
        this.unsubscribe = eventBusService.on('note-to-mail', (note) => {

            // this.setState({ emailContent: { ...emailContent, subject: note.info.txt } })
        })
    }


    onSubmit = (ev) => {
        ev.preventDefault()        
    }

    onSendEmail = () => {
        EmailService.sendEmail(this.state.emailContent, Date.now())
        this.props.onIsComposing() 
        console.log('Sent!')
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            emailContent: {
                ...prevState.emailContent,
                [field]: value
            }
        }))
    }

    onCreateNote = (email) => {
        console.log('email:', email)
        createNote(email)
    }

    onCloseComposer = () => {
        const { onIsComposing } = this.props
        const { to, subject, message } = this.state.emailContent
        if (to !== '' || subject !== '' || message !== '') {
            EmailService.createDraft(to, subject, message)
            {onIsComposing()}
        } else{
            {onIsComposing()}
        }
    }

    render() {
        const { onIsComposing } = this.props
        const { to, subject, message ,body} = this.state.emailContent
        return <form onSubmit={this.onSubmit} className="compose-container">
            <div className="compose-headline">
                <h1>New Message</h1>
                <button onClick={this.onCloseComposer}>X</button>
            </div>
            <input
                name="to"
                className="send-to compose-input"
                type="email"
                placeholder="to"
                value={to}
                onChange={this.handleChange}
            />
            <input
                name="subject"
                className="subject compose-input"
                type="text"
                placeholder="subject"
                value={subject}
                onChange={this.handleChange}
            />
            <input
                name="message"
                className="body compose-input"
                type="text"
                placeholder="message..."
                value={message}
                onChange={this.handleChange}
            />
            <button onClick={this.onSendEmail}>Send</button>
            <Link to={"/note"} onClick={() => this.onCreateNote({ subject, message })}><img className="icon-btn" src="assets/img/keepIcon.svg" alt="" /></Link>
        </form>
    }

}