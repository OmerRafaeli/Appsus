import { EmailService } from "../services/mail.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'
const { Link } = ReactRouterDOM

export class Compose extends React.Component {
    state = {
        emailContent: {

            to: '',
            subject: '',
            message: '',
            sentAt: Date.now(),
            isRead: true,
            sentAt: '',
            isImportant: false,
            isSent: true,
        }
    }

    // inputRef = React.createRef()



    onSubmit = (ev) => {
        ev.preventDefault()
        EmailService.sendEmail(this.state.emailContent)

    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            emailContent: {
                ...prevState.emailContent,
                [field]: value
            }
        }),() =>{ console.log(this.state.emailContent)}
        )
    }

    render() {
        const { onIsComposing } = this.props
        const { to, subject, body } = this.state.emailContent
        return <form onSubmit={this.onSubmit} className="compose-container">
            <div className="compose-headline">
                <h1>New Message</h1>
                <button onClick={onIsComposing}>X</button>
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
                name="body"
                className="body compose-input"
                type="text"
                placeholder="message..."
                value={body}
                onChange={this.handleChange}
            />
            <button>Send</button>
            <Link to={"/note"} ><img  className="icon-btn" src="assets/img/keepIcon.svg" alt="" /></Link>
        </form>
    }

}