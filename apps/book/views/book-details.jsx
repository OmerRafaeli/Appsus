import { LongText } from "../cmps/long-text.jsx"
import { ReviewAdd } from "../cmps/review-add.jsx"
import { ShowReviews } from "../cmps/show-review.jsx"
import { bookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {


    state = {
        book: null
    }

    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getBookById(bookId)
            .then(book => { this.setState({ book }) })
    }

    getReadingTxt = () => {
        const { book } = this.state
        if (book.pageCount > 500) return ', Long Reading'
        if (book.pageCount > 200) return ', Decent Reading'
        if (book.pageCount < 100) return ', Light Reading'
        else return ''
    }

    getPublishedDate = () => {
        const { book } = this.state
        const published = book.publishedDate
        const currDate = Date.now()
        if (currDate - (Date.parse(new Date(published, 0))) > 1000 * 60 * 60 * 24 * 365 * 10) {
            return ', Veteran Book'
        }
        if (currDate - (Date.parse(new Date(published, 0))) < 1000 * 60 * 60 * 24 * 365) {
            return ', New!'
        }
    }

    getPriceClass = () => {
        const { book } = this.state
        const price = book.listPrice.amount
        if (price > 150) return 'red'
        if (price < 20) return 'green'
        else return ''
    }

    onGoBack = () => {
        this.props.history.push("/book")
    }

    removeReview = (ev) => {
        console.log('ev:', ev)
    }

    render() {

        const { book } = this.state
        if (!book) return <h3>Loading...</h3>
        const { categories } = book
        const price = book.listPrice.amount
        const currencyIcon = bookService.currencyIcon(book.listPrice.currencyCode)
        const nextBookId = bookService.getNextBookId(book.id)
        const prevBookId = bookService.getPrevBookId(book.id)
        // console.log('book:', book)

        return <section className="book-details main-layout full">
            <div className="book-details-container">
                <article className="book-titles">
                    <h3>Title: {book.title}</h3>
                    <h3>Subtitle: {book.subtitle}</h3>
                    <h3>Authors: {book.authors}</h3>
                    <h3>Published date: {book.publishedDate}{this.getPublishedDate()}</h3>
                    <h3>Page count: {book.pageCount} pages{this.getReadingTxt()}</h3>
                    <h3>Categories: {categories.map(category => {
                        return <p>{category}</p>
                    })}</h3>
                    <h3>Language: {book.language}</h3>
                    <h3 className={this.getPriceClass()}>Price: {price}{currencyIcon}</h3>
                    {book.reviews && <ShowReviews book={book} removeReview={this.removeReview} />}
                </article>
                <article className="book-description">
                    <div className="img-container">
                        <img src={`${book.thumbnail}`} alt="" />
                    </div>
                    <h4>Description:</h4>
                    <LongText text={book.description} />
                </article>
            </div>
            <Link to={`/book/${prevBookId}`}><button >Previous Book</button></Link>
            <button onClick={this.onGoBack}>Go back</button>
            <Link to={`/book/${nextBookId}`}><button >Next Book</button></Link>
            {book.listPrice.isOnSale && <div className="sale">ON SALE!</div>}
            <ReviewAdd bookId={book.id} loadBook={this.loadBook} />
        </section>
    }
}