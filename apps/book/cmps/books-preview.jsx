import { bookService } from "../services/book.service.js"
const { Link } = ReactRouterDOM


export function BooksPreview({ book, onRemoveBook }) {
    const price = book.listPrice.amount
    const currencyIcon = bookService.currencyIcon(book.listPrice.currencyCode)
    // console.log('currencyIcon:', currencyIcon)

    return <article className="books-preview">
        <h3>Title: {book.title}</h3>
        <h3>Price: {price}{currencyIcon}</h3>
        <Link to={`/book/${book.id}`}>
            <div className="img-container">
                <img src={`${book.thumbnail}`} alt="" />
            </div>
        </Link>
        <button onClick={() => onRemoveBook(book.id)}>x</button>
    </article>
}