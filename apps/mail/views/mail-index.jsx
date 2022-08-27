import { MailList } from "../cmps/mail-list.jsx"
import { SideNav } from "../cmps/side-nav-bar.jsx"
import { EmailFilter } from "../cmps/email-filter.jsx"
import { UnreadCounter } from "../cmps/email-unread-counter.jsx"
import { EmailService } from "../services/mail.service.js"

export class MailIndex extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        unreadEmails: 0

    }

    componentDidMount() {
        this.loadEmails()
        this.checkUnreadEmails()
    }

    componentDidUpdate() {
        // this.checkUnreadEmails()
    }

    loadEmails = () => {
        EmailService.query()
            .then((emails) => this.setState({ emails }))
    }

    checkUnreadEmails = () => {
        EmailService.getUnreadEmails()
            .then((unreadEmails) => this.setState({ unreadEmails }))
    }

    onRemoveEmail = (emailId) => {
        EmailService.remove(emailId)
            .then(() => {
                console.log('Removed!')
                const emails = this.state.emails.filter(email => email.id !== emailId)
                this.setState({ emails })
                showSuccessMsg('email removed')

            })
            .catch(err => {
                console.log('Problem!!', err)
                showErrorMsg('Cannot remove email')
            })
    }


    render() {
        const { emails, unreadEmails } = this.state
        return (
            <section className="mail-index-container">
                <SideNav />
                <UnreadCounter unreadEmails={unreadEmails} />
                <MailList emails={emails} onRemoveEmail={this.onRemoveEmail} />
            </section>
        )
    }
}
