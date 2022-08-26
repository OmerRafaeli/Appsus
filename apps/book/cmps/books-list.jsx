import { BooksPreview } from "./books-preview.jsx";

export function BooksList({ books, onRemoveBook }) {
    // console.log('props:', props)
    return <div className="full main-layout">
        <section className="books-list ">
            {books.map(book => <BooksPreview
                key={book.id}
                book={book}
                onRemoveBook={onRemoveBook}
            />)}
        </section>
    </div>
}