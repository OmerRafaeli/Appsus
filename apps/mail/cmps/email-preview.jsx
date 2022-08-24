const { Link } = ReactRouterDOM

export function EmailPreview({ email }) {

    function setArrivalDate() {
        let emailSent = new Date(email.sentAt)
        let currTime = new Date(Date.now())

        currTime = currTime.getDate() + "/" + (currTime.getMonth() + 1) + "/" + currTime.getFullYear()
        emailSent = emailSent.getDate() + "/" + (emailSent.getMonth() + 1) + "/" + emailSent.getFullYear()

        return emailSent

    }


    return <article className="email-preview">
        <div className="important">
            <img src="assets/img/importantUnmarked.svg" alt="" />
        </div>
        <Link className="email-container" to={"/mail/" + email.id} email={email.id}>
            <h3>{email.to}</h3>
            <p>{email.subject}</p>
            <p>{email.body}</p>
            <h4>{setArrivalDate()}</h4>
        </Link>
    </article>
}