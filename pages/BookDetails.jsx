import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(setBook)
            .catch(err=>{
                console.log('Problem getting book:', err)
            })
    }, [])

    if (!book) return <div>Loading...</div>

    const {title, subtitle, authors, publishedDate, description, pageCount, categories,thumbnail, language, listPrice, id} = book

    function getPageCountText(pageCount){
        switch(true){
            case pageCount> 500:
                return 'Serious Reading'
            case pageCount> 200:
                return 'Descent Reading'
                case pageCount> 100:
                return 'Light Reading'
        }
    }
    function getPublishedDateTxt(publishedDate){
        return new Date().getFullYear() - publishedDate > 10 ? "Vintage" : "New!"
    }
    
    const priceColor = listPrice.amount > 150 ? "red" : listPrice.amount <20 ? "green" : "" 

    return (
        <section className="book-details">
            <h1> {title} </h1>
            <h2>Written by: {authors.map(a=><span>{a}</span>)} </h2>
            <h2>  {getPublishedDateTxt(publishedDate)} </h2>
            <h2> {subtitle} </h2>
            <img src={thumbnail} alt="Book Image" />
            <h4 className={`${priceColor}`}>{listPrice.amount}{listPrice.currencyCode}</h4>
            <h2>Categories: {categories.map(c=><span>{c}</span>)} </h2>
            {/* <p>Description: {description}</p> */}
            <LongTxt  text={description}/>
            <h2>Language: {language} </h2>
            <h3>{getPageCountText(pageCount)} </h3>
            <button onClick={onBack}>Back</button>
        </section>
    )
}

// listPrice.isOnSale: false TODO