import { SideNav } from "../cmps/side-nav-bar.jsx"
import { EmailService } from "../services/mail.service.js"


export class EmailDetails extends React.Component {

    state = {
        email: null,
    }

    componentDidMount() {
        this.loadEmail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail()
        }
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

    render() {
        const { email } = this.state
        if (!email) return <div>Loading...</div>
        return <section className="email-details-container">
            <SideNav />
            <div className="email-details">
                <div className="email-nav">
                    <a className="go-back-btn" onClick={this.onGoBack}><i className="fa-solid fa-arrow-left-long"></i></a>
                    <img className="important" src="assets/img/importantUnmarked.svg" alt="" onClick={() => onStarClicked()} />
                    <a><i className="fa-solid fa-envelope"></i></a>
                    <a><i className="fa-solid fa-trash"></i></a>
                </div>
                <h1>Sent To: {email.to}</h1>
                <hr />
                <p className="email-subject">Subject: {email.subject}</p>
                <p className="email-body">{email.body}</p>
            </div>
        </section>
    }
}