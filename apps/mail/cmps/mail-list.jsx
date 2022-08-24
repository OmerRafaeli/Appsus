import { EmailPreview } from "./email-preview.jsx"
export function MailList({ emails }) {

    return <section className="mail-list-container">
        <div className="email-preview-panel">
            <input type="checkBox" />
            <button>D</button>
            <button>UR</button>
        </div>
        {emails.map(email =>
            <EmailPreview key={email.id} email={email} />
        )}
    </section>

}


