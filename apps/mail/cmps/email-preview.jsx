const {Link} = ReactRouterDOM

export function EmailPreview({email}) {

    function setArrivalDate(){
        let emailSent = new Date(email.sentAt)
        let currTime = new Date(Date.now())

        currTime = currTime.getDate()+"/"+(currTime.getMonth()+1)+"/"+currTime.getFullYear()
        emailSent = emailSent.getDate()+"/"+(emailSent.getMonth()+1)+"/"+emailSent.getFullYear()
        
        return emailSent
        
    }


    return <article className="email-preview">
        <Link to={"/mail/" + email.id}>
        <h3>to: {email.to}</h3>
        <h3>{email.subject}</h3>
        <p>{email.body}</p>
        <h4>{setArrivalDate()}</h4>
        </Link>
    </article>
}