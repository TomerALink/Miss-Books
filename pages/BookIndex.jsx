import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
// import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
   
    // bookService.query().then(console.log)

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books =>
                    books.filter(book => book.id !== bookId)
                )
            })
            .then(
                showSuccessMsg(`Book removed secssesfuly!`)
            )
            .catch(err => {
                showErrorMsg(`Problems removing book ${bookId}`)
                console.log('Problems removing book:', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({...prevFilter, ...filterByToEdit}))
    }

   

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <section>
               <button> <Link to="/book/add"> Add Book</Link> </button>
            </section>
            <BookList   onRemoveBook={onRemoveBook} books={books} />
           
        </section>
    )

}