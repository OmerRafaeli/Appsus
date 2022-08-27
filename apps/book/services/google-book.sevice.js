import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"


export const googleBookService = {
    getGoogleBooks
}
const KEY = 'searchedBooks'
let gSearchedBooksCache = storageService.loadFromStorage(KEY) || []

function getGoogleBooks(searchedBook) {
    // if (!gSearchedBooksCache || gSearchedBooksCache.length === 0) {
        console.log('searchedBook:', searchedBook)
        return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchedBook}`)
            .then((res) => res.data)
            .then(_showResults)

            .catch(() => {
                throw new Error('Could not find books')
            })
    // } else return Promise.resolve(gSearchedBooksCache)
}

function _showResults(searchedBooks) {
    // const books = []
    const results = searchedBooks.items.map(book => {

        return {
            id: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories,
            thumbnail: book.volumeInfo.imageLinks.thumbnail,
            language: book.volumeInfo.language,
            listPrice: {
                amount: utilService.getRandomIntInclusive(15, 200),
                currencyCode: "USD",
                isOnSale: book.saleInfo.saleability
            }

        }
    })

    // gSearchedBooksCache = results
    // storageService.saveToStorage(KEY, gSearchedBooksCache)
    // setTimeout(() => {
    //     gSearchedBooksCache = []
    //     storageService.saveToStorage(KEY, gSearchedBooksCache)
    // }, 1000 * 30)
    // console.log('results:', results)
    return Promise.all(results)
}

