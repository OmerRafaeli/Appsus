
export function SearchedBooksList({ book, onGetBook }) {

    // function onGetBook(bookId) {
    //     // console.log('bookId:', bookId)

    // }

    const bootTitle = book.title.substring(0, 30)
    return <React.Fragment>
        <p>{book.title} <button onClick={() => {
            onGetBook(book.id)
        }}>+</button></p>

    </React.Fragment>
}