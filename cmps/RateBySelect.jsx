

export function RateBySelect({onhandleChange, rating}) {
    return (
        <React.Fragment>
            <label htmlFor="rating">rating</label>
            <select onChange={onhandleChange} value={rating}
                name="rating" id="rating" >
                <option value="">Select a rating</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
        </React.Fragment>
    )
}