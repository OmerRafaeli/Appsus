export function EmailPreview({email}) {

    return <article className="email-preview">
        <h3>to: {email.to}</h3>
        <h3>{email.subject}</h3>
        <p>{email.body}</p>
        <h4>arrived At: {email.sentAt}</h4>
    </article>
}