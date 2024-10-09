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
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getDefaultFilter() {
    return { txt: '', price: '' }
}

function getEmptyBook(title = '', subtitle ='', authors = [], publishedDate, description = '',pageCount='', categories=[], thumbnail = '', language, listPrice = {}, id){
    return {title, subtitle , authors, publishedDate, description, pageCount, categories, thumbnail, language,  listPrice, id}
}

function _createBook(newBook){
    const {title, subtitle, authors, publishedDate, description, pageCount, categories,thumbnail, language, listPrice, id} = newBook
    const book = getEmptyBook(title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice, id )
    if(!id) book.id = makeId()
    
    return book
}

function _createBooks(){

    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        
        books = 
            hc_books.map(book => 
            _createBook(book)
        )
        
        saveToStorage(BOOK_KEY, books)
    }
}
