import {saveToStorage , loadFromStorage} from '../services/util.service.js'

const GOOGLE_STORAGE_KEY = 'google_books'
let gGoogleBooks = loadFromStorage(GOOGLE_STORAGE_KEY) || {}

export function getGoogleBooks(searchValue) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchValue}`)
        .then(res => {
            const searchRes = res.data.items
            gGoogleBooks = {
                ts: Date.now(),
                data: _formatData(searchRes),
            }

            saveToStorage(GOOGLE_STORAGE_KEY, gGoogleBooks)
            return _formatData(searchRes);  // Return the formatted data
        })
        .catch(err => {
            console.error('Error fetching books:', err)
            return []  // Return an empty array or handle the error as needed
        })
}

function _formatData(searchRes){
    console.log(searchRes)
    const books = searchRes.map(book =>{
        return{
            id: book.id,
            title: book.volumeInfo.title,
            subtitle: '',
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories,
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
            language: book.volumeInfo.language,
            listPrice: {
              amount: '',
              currencyCode: '',
              isOnSale: false
            }}
    })
    
    
    return books
}