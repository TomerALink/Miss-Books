

export function RateByTextbox({onhandleChange, rating}) {
    return (
        <React.Fragment>

            <label htmlFor="rating">rating</label>
            <input onChange={onhandleChange} value={rating}
                type="text" name="rating" id="rating" />

        </React.Fragment>
    )
}