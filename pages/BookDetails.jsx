import { bookService } from "../services/book.service.js";
import { LongTxt } from "../cmps/LongTxt.jsx";

const {useParams, Link, useNavigate} = ReactRouterDOM

const { useEffect, useState } = React

export function BookDetails() {
  const [book, setBook] = useState(null)
  const {bookId} = useParams()
  const navigate  = useNavigate()

  useEffect(() => {
    loadBook()
  }, [bookId])

  function loadBook() {
    bookService.get(bookId)
    .then(setBook)
    .catch(err => {
      console.log('Problem loading book:', err)
    })
  }


  if (!book) return <div>Loading...</div>;

  const {
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    thumbnail,
    language,
    listPrice,
    id,
  } = book;

  function onBack() {
    navigate("/book")
  }

  function getPageCountText(pageCount) {
    switch (true) {
      case pageCount > 500:
        return "Serious Reading";
      case pageCount > 200:
        return "Descent Reading";
      case pageCount > 100:
        return "Light Reading";
    }
  }
  function getPublishedDateTxt(publishedDate) {
    return new Date().getFullYear() - publishedDate > 10 ? "Vintage" : "New!";
  }

  function getCurrencySymbol(currencyCode) {
    switch (currencyCode.toUpperCase()) {
      case "EUR":
        return "€"
      case "USD":
        return "$"
      case "ILS":
        return "₪"
      default:
        return currencyCode.toUpperCase()
    }
  }
  const priceColor =
    listPrice.amount > 150 ? "red" : listPrice.amount < 20 ? "green" : "";

  return (
    <section className="book-details">
      <div className="book-title">
        <h1>{title}</h1>
        <h3>
          by:{" "}
          {authors.map((a,idx) => (
            <span key={idx}>{a}</span>
          ))}
        </h3>
      </div>
      <div className="book-content">
        <div>
          <img src={thumbnail} alt="Book Image" />
        </div>
        <div>
          <div><b> {getPublishedDateTxt(publishedDate)} </b>
            <span className="pipe"> |</span> <b>{getPageCountText(pageCount)}</b></div>
          <div> {subtitle} </div>
          <div>
            <b>Categories:</b>{" "}
            {categories.map((c,idx) => (
              <span key={idx} >{c}</span>
            ))}{" "}
          </div>

          <div><b>Language:</b> {language} </div>
          

          <div className={`${priceColor}`}>
            <b>Price: </b>
            {listPrice.amount}
            {" " + getCurrencySymbol(listPrice.currencyCode)}
          </div>
        </div>
      </div>
      <div className="description">
        <LongTxt text={description} />
      </div>
      <button onClick={onBack}> Back </button>
      <section>
          <button > <Link to={`/book/${book.prevBookId}`}> Prev Car</Link> </button>
          <button > <Link to={`/book/${book.nextBookId}`}> Next Car</Link> </button>
      </section>
    </section>
  )
}

