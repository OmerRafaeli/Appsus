import { EmailPreview } from "./email-preview.jsx"
// const { Link } = ReactRouterDOM

export function MailList({ emails }) {

    return <section className="mail-list-container">
        <ul>
            {emails.map(email => (!email.isRead && !email.isSent) && <li key={email.id} className="clean-list">
                <EmailPreview email={email} />
            </li>
            )}
            
            {emails.map(email => (email.isRead && !email.isSent) && <li key={email.id} className="clean-list">
                <EmailPreview email={email} />
            </li>
            )}
        </ul>
    </section>

}


