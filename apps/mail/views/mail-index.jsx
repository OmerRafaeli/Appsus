import { MailList } from "../cmps/mail-list.jsx"
import { SideNav } from "../cmps/side-nav-bar.jsx"

export class MailIndex extends React.Component {
    render() {
        return (
            <section className="mail-index-container">
                <SideNav />
                <MailList />                
            </section>
        )
    }
}
