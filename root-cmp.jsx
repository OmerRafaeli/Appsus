import { AppHeader } from "./cmps/app-header.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { EmailDetails } from "./apps/mail/cmps/email-details.jsx"
import { BooksApp } from "./apps/book/views/books-app.jsx"
import { BookDetails } from "./apps/book/views/book-details.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>
                <Route path="/mail/:emailId" component={EmailDetails} />
                <Route path="/mail" component={MailIndex} />
                <Route path="/note" component={NoteIndex} />
                <Route path="/book/:bookId" component={BookDetails}></Route>
                <Route path="/book" component={BooksApp}></Route>
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
