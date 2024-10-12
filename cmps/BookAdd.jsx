const { useState, useEffect } = React
const { Routes, Route, Navigate, Link } = ReactRouterDOM
import { debounce } from '../debounce.js'  // Import debounce from the external file
import { getGoogleBooks } from '../services/google-books-API.js'
import { bookService } from '../services/book.service.js'


export function BookAdd() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    // Debounced input handler
    const handleInputChange = debounce((value) => {
        setSearchTerm(value)
    }, 3000);  // 300ms debounce time

    useEffect(() => {
        if (searchTerm) {
            fetchBooks(searchTerm)
        }
    }, [searchTerm])

    function fetchBooks(searchTerm) {
        getGoogleBooks(searchTerm)
            .then((books) => {
                console.log(books)
                setSearchResults(books || [])
            })
            .catch((err) => {
                console.error('Error fetching books:', err)
                setSearchResults([]);  // Optional: Clear results on error
            })


    }

    function onAddBook(book) {
        console.log(book)
        bookService.add(book)
            .then(book => {
                console.log('book saved secsesfully', book)
                showSuccessMsg(`book added secsesfully`)
            })
            .catch(err => {
                console.log('error at saving book: ', err)
                showErrorMsg('error at adding book')
            })
    }

    return (
        <div className="book-add">
            <h2>Add a New Book</h2>
            <input
                type="text"
                placeholder="Search for books..."
                onChange={(e) => handleInputChange(e.target.value)}
            />

            <ul className="book-list-search">
                {searchResults.map((book) => (
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => onAddBook(book)}>+</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}