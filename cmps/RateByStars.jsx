

const { useState, useEffect  } = React

export function RateByStars({ onhandleChange, rating }) {
    
    const [ratingVal, setRatingVal] = useState(rating)

    useEffect(() => {
        setRatingVal(rating)
    }, [rating])

    const handleClick = (star) => {
        setRatingVal(star);
        onhandleChange({ target: { name: 'rating', value: star }})
    }

    const [hover, setHover] = useState(0)

    return (
        <React.Fragment>
             <div className="rate-by-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= (hover || ratingVal) ? "star filled" : "star"}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        style={{ cursor: "pointer", fontSize: "2rem" }}
                    >
                        ★
                    </span>
                ))}
            </div>
            
        </React.Fragment>
    )
}

