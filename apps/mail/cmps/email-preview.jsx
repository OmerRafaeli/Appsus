const { Link } = ReactRouterDOM
import { EmailService } from "../services/mail.service.js"

export function EmailPreview({ email }) {

    function setArrivalDate() {
        let emailSent = new Date(email.sentAt)
        let currTime = new Date(Date.now())

        currTime = currTime.getDate() + "/" + (currTime.getMonth() + 1) + "/" + currTime.getFullYear()
        emailSent = emailSent.getDate() + "/" + (emailSent.getMonth() + 1) + "/" + emailSent.getFullYear()

        return emailSent

    }

    function markUnread (){
        if(email.isRead) return 'read-email'
        else return 'unread-email'
    }

    function onStarClicked() {
        EmailService.starClick(email.id)

    }

    function markImportant(){
        if(email.isImportant) return 'Marked'
        else return 'Unmarked'
    }




    return <article className={`email-preview ${markUnread()}`}>
        <input type="checkBox" />
        <div className="important">
            <img src="assets/img/importantUnmarked.svg" alt="" onClick={() => onStarClicked()} />
        </div>
        <Link className="email-container" to={"/mail/" + email.id}>
            <h3>{email.to}</h3>
            <p className="email-subject">{email.subject}</p>
            <p className="email-body">{email.body}</p>
            <h4>{setArrivalDate()}</h4>
        </Link>
    </article>
}