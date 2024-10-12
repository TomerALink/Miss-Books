
export function Review({ review }) {

    
    const { fullname,  rating, readAt } = review
    
    
    
    return (
        <span className="review">
            <span>{fullname}</span> ||
            <span>{'⭐'.repeat(rating)}</span>
            <span>{readAt}</span>
        </span>
    )
}