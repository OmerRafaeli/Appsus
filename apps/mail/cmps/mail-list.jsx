import { EmailPreview } from "./email-preview.jsx"
// const { Link } = ReactRouterDOM

export function MailList({ emails}) {

    return <section className="mail-list-container">
        <div className="email-preview-panel">
            <input type="checkBox" />
            <a><i className="fa-solid fa-trash"></i></a>
            <a><i className="fa-solid fa-envelope"></i></a>
        </div>
        <ul>
            {emails.map(email => <li key={email.id} className="clean-list">
                <EmailPreview email={email}/>
            </li>
            )}
        </ul>
    </section>

}


