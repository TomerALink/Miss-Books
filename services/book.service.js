import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { hc_books } from '../books.js'

const BOOK_KEY = 'bookDN'



export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getEmptyReview,
    addReview,
    removeReview,
    add,
    getFilterFromSearchParams,
    getCategoryStats
}

_createBooks()

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount <= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function removeReview(bookId, reviewId) {
    console.log(bookId, reviewId)
    return new Promise((resolve, reject) => {
        get(bookId).then(book => {
            console.log(book)
            if (!book) {
                reject('Book not found')
                return;
            }

            console.log(book.reviews, reviewId)
            const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)

            if (reviewIdx === -1) {
                reject('Review not found')
                return;
            }

            book.reviews.splice(reviewIdx, 1)
            save(book);

            resolve('Review removed successfully')
        })

    })
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function add(book) {
    return storageService.post(BOOK_KEY, book)
}

function getDefaultFilter() {
    return { txt: '', price: '' }
}

function getEmptyBook(title = '', subtitle = '', authors = [], publishedDate, description = '', pageCount = '', categories = [], thumbnail = '', language, listPrice = { amount: 0 }, id, reviews = []) {
    return { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice, reviews, id }
}

function _createBook(newBook) {
    const { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice, id } = newBook
    const book = getEmptyBook(title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice, id, [])
    if (!id) book.id = makeId()

    return book
}

function _createBooks() {

    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {

        books =
            hc_books.map(book =>
                _createBook(book)
            )

        saveToStorage(BOOK_KEY, books)
    }
}


function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function getEmptyReview(fullname = '', rating = 0, readAt = new Date()) {
    return { fullname, rating, readAt }
}

function addReview(bookId, review) {
    return get(bookId).then(
        book => {
            review.id = makeId()
            book.reviews.push(review)
            save(book)
        }
    )
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const price = searchParams.get('price') || ''
    return {
        txt,
        price
    }
}

function _getBookCountByCategoryMap(books) {
    const bookCountByCategoryMap = books.reduce((map, book) => {
        if (book.categories && Array.isArray(book.categories)) {
            book.categories.forEach(category => {
                if (!map[category]) map[category] = 0  
                map[category]++ 
            });
        }
        return map
    }, {})

    console.log(bookCountByCategoryMap)
    return bookCountByCategoryMap
}


function getCategoryStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByCategoryMap = _getBookCountByCategoryMap(books)
            const data = Object.keys(bookCountByCategoryMap)
                .map(category =>
                ({
                    title: category,
                    value: Math.round((bookCountByCategoryMap[category]
                        / books.length) * 100)
                }))
            return data
        })
}