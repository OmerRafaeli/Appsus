import { EmailPreview } from "./email-preview.jsx"


export function MailList({ emails }) {

    return <section className="mail-list-container">
        <div className="email-preview-panel">
            <input type="checkBox" />
            <a><i className="fa-solid fa-trash"></i></a>
            <a><i className="fa-solid fa-envelope"></i></a>
        </div>
        {emails.map(email =>
            <EmailPreview key={email.id} email={email} />
        )}
    </section>

}


