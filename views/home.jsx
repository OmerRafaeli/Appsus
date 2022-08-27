const { Link } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <img className="appsus-logo animate__animated animate__backInLeft" src="assets/img/appsus.png" alt="" />
        <h1>Welcome to Appsus</h1>
        <p>Let us show you what we have been up to</p>
        <section className="app-links">
            <Link to="/book" className="app-img">
                <img src="assets/img/booksIcon.svg" alt="" />
                <h4>books library</h4>
            </Link>
            <Link to="/note" className="app-img">
                <img src="assets/img/keepIcon.svg" alt="" />
                <h4>keep app</h4>
            </Link>
            <Link to="/mail" className="app-img">
                <img src="assets/img/mailIcon.svg" alt="" />
                <h4>stay connected</h4>
            </Link>
        </section>
        <br />
        <hr />
        <section className="members">
                <img className="member-img" src="assets/img/member1.png" alt="" />
                <div className="member-info-container">
                    <h2>Yoav Sher</h2>
                    <p>coding academy students on our way to the future</p>
                </div>
                <img className="member-img" src="assets/img/member2.png" alt="" />
                <div className="member-info-container">
                    <h2>Omer Rafaeli</h2>
                    <p>coding academy students on our way to the future</p>
                </div>
        </section>
    </section>
    
}