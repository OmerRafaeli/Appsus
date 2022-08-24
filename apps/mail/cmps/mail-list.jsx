import { EmailPreview } from "./email-preview.jsx"
export function MailList({ emails }) {

    return <section className="mail-list-container">
        <div className="emails-filter">
            
        </div>
        {emails.map(email => <EmailPreview key={email.id}
            email={email}/>)}
    </section>

}


