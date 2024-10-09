
export function BookPreview({ book }) {

    
    const { title,  thumbnail, listPrice } = book
    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <img src={thumbnail} alt="Book Image" />
            {listPrice.isOnSale && <img className="on-sale" src='./assets/img/sale.png' alt="Book Image" />}
            <h4>{listPrice.amount}{listPrice.currencyCode}</h4>
            

        </article>
    )
}