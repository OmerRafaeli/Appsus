import { MailList } from "../cmps/mail-list.jsx"
import { SideNav } from "../cmps/side-nav-bar.jsx"
import { EmailService } from "../services/mail.service.js"

export class MailIndex extends React.Component {

    state = {
        emails: [],
    }

    componentDidMount(){
        this.loadEmails()       
    }

    loadEmails = () => {
        EmailService.query()
            .then((emails) => this.setState({ emails }))
    }
    

    render() {
        const {emails} = this.state
        return (
            <section className="mail-index-container">
                <SideNav />
                <MailList emails={emails}/>
            </section>
        )
    }
}
