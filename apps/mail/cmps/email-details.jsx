import { SideNav } from "../cmps/side-nav-bar.jsx"
import { EmailService } from "../services/mail.service.js"


export class EmailDetails extends React.Component {

    state = {
        email: null,
    }

    componentDidMount() {
        this.loadEmail()
        // this.onMarkRead()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail()
        }
    }

    onMarkRead = () => {
        const {emailId} = this.props.match.params
        // console.log('emailId:', emailId)        
        EmailService.markRead(emailId)
            .then((email) => {
                this.setState({ email })
                this.onGoBack()
            })
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params

        EmailService.getById(emailId)
            .then((email) => {
                this.setState({ email })
            })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    onRemoveEmail = (emailId) => {
        EmailService.remove(emailId)
            .then((email) => {
                this.setState({ email })
                this.onGoBack()
            })
    }

    render() {
        const { email } = this.state
        if (!email) return <div>Loading...</div>
        return <section className="email-details-container">
            <SideNav />
            <div className="email-details">
                <div className="email-nav">
                    <a className="go-back-btn" onClick={this.onGoBack}><i className="fa-solid fa-arrow-left-long"></i></a>
                    <i class="fa-regular fa-star"onClick={() => onStarClicked()}></i>
                    <a onClick={this.onMarkRead}><i className="fa-solid fa-envelope" ></i></a>
                    <a onClick={() => this.onRemoveEmail(email.id)}><i className="fa-solid fa-trash"></i></a>
                </div>
                <h1>Sent To: {email.to}</h1>
                <hr />
                <p className="email-subject">Subject: {email.subject}</p>
                <p className="email-body">{email.body}</p>
            </div>
        </section>
    }
}