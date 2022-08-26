import { BookAdd } from '../cmps/book-add.jsx'
import { BooksFilter } from '../cmps/books-filter.jsx'
import { BooksList } from '../cmps/books-list.jsx'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { BookDetails } from './book-details.jsx'

export class BooksApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
        // selectedBook: null
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        // console.log('filterBy:', filterBy)
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }

    onAddGoogleBook = (book) => {
        //   console.log('book:', book)
        bookService.addGoogleBook(book)
            .then(book => this.setState({ books: [book, ...this.state.books] }),
            showSuccessMsg(`Book ${book.title} has been added`))

    }

    onRemoveBook = (bookId) => {
        // console.log('bookId:', bookId)
        bookService.removeBook(bookId)
            .then(() => {
                const books = this.state.books.filter(book => book.id !== bookId)
                this.setState({ books })
                showSuccessMsg('Book removed')
            })
    }

    render() {
        const { books } = this.state
        // console.log('this.state.books:', this.state)
        return <section className="books-app main-layout full">

            <BookAdd onAddGoogleBook={this.onAddGoogleBook} />
            <BooksFilter onSetFilter={this.onSetFilter} />
            <BooksList books={books} onRemoveBook={this.onRemoveBook} />

        </section>

    }
}