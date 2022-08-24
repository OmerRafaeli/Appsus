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
                console.log('email:', email)                
            })
        // console.log('email:', email)
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
                <h1>Sent To: {email.to}</h1>
                <p>Subject: {email.subject}</p>
                <p>{email.body}</p>
            </div>
            <a className="go-back-btn fa-solid fa-palette" onClick={this.onGoBack} >Back</a>
            
            
        </section>
    }
}