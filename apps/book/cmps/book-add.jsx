import { googleBookService } from "../services/google-book.sevice.js"
import { SearchedBooksList } from "./searched-books-list.jsx"


export class BookAdd extends React.Component {

    state = {
        searchedBook: null,
        books: null,
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ searchedBook: value })
    }

    onShowResults = (ev) => {
        ev.preventDefault()
        const { searchedBook } = this.state
        googleBookService.getGoogleBooks(searchedBook)
            .then(res => this.setState({ books: res }))

    }

    onGetBook = (bookId) => {
        // console.log('bookId:', bookId)
        const books = this.state.books
        const book = books.find(book => book.id === bookId)
        // console.log('book:', this.searchedBook)
        this.props.onAddGoogleBook(book)
        this.setState({
            searchedBook: null,
            books: null,
        })
    }

    render() {
        const { searchedBook, books, selectedBook } = this.state
        // const { onAddGoogleBook } = this.props
        return <section className="book-add">
            <form onSubmit={this.onShowResults}>
                <label htmlFor="search-book"></label>
                <input type="search"
                    placeholder="Add book"
                    id="search-book"
                    name="search-book"
                    value={searchedBook}
                    onChange={this.handleChange} />
                    <button>Add</button>
            </form>
            {books && <ul className="searched-book-list">
                {books.map(book => <SearchedBooksList
                    key={book.id}
                    book={book}
                    onGetBook={this.onGetBook} />
                )}
            </ul>}
        </section>
    }
}