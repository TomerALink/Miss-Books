const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { Review } from "./Review.jsx"

export function ReviewList({ book, onRemoveReview}) {

    function onRemoveReview(bookId, reviewId) {
        bookService.removeReview(bookId, reviewId)
            .then(() => {
                // Assuming you want to update the reviews, not the books
                setBooks(prevBooks => 
                    prevBooks.map(book => 
                        book.id === bookId 
                        ? { ...book, reviews: book.reviews.filter(review => review.id !== reviewId) }
                        : book
                    )
                )
            })
            .then(() => {
                showSuccessMsg(`Review removed successfully!`)
            })
            .catch(err => {
                showErrorMsg(`Problems removing review ${reviewId}`)
                console.log('Problems removing review:', err)
            })
    }

    return (
        <ul className="review-list">
            {book.reviews.map(review =>
                <li key={review.id}>
                    
                    <Review review={review} />
                     <div>
                     <button onClick={() => onRemoveReview(book.id, review.id)}>Remove </button>
                        </div>  
                   
                </li>
            )}
        </ul>
    )
}