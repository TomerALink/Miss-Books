import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { RateBySelect } from "./RateBySelect.jsx"
import { RateByStars } from "./RateByStars.jsx"
import { RateByTextbox } from "./RateByTextbox.jsx"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function AddReview() {

    const [review, setReview] = useState(bookService.getEmptyReview())

    const { bookId } = useParams()

    const [cmpType, setcmpType] = useState('Select')

    const handleOptionChange = (e) => {
        setcmpType(e.target.value)
    }


    useEffect(() => {

    }, [review])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default: console.log(target.type, target.value)
        }

        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }


    const navigate = useNavigate()

    function onSaveBookReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, review)
            .then(book => {


                console.log('book review add and saved secsesfully', book)
                showSuccessMsg(`book review saved secsesfully`)

            })
            .catch(err => {
                console.log('error at adding review book: ', err)
                showErrorMsg('error at saveing book review book')
            }).finally(() => {
                navigate(`/book/${bookId}`)
            })
    }


    return <section className="add-review">
        <div>
            <h3>Select Rating Method:</h3>
            <div>
                <input
                    type="radio"
                    id="select"
                    name="rating"
                    value="Select"
                    checked={cmpType === 'Select'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="select">Select</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="textbox"
                    name="rating"
                    value="Textbox"
                    checked={cmpType === 'Textbox'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="textbox">Textbox</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="stars"
                    name="rating"
                    value="Stars"
                    checked={cmpType === 'Stars'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="stars">Stars</label>
            </div>

            <p>Selected option: {cmpType}</p>
        </div>

        <h1>Add Review</h1>
        <form onSubmit={onSaveBookReview}>
            <label htmlFor="fullname"> Full name</label>
            <input onChange={handleChange} value={review.fullname}
                type="text" name="fullname" id="fullname" />

            <DynamicCmp cmpType={cmpType} onhandleChange={handleChange} rating={review.rating}/>
            {/* <label htmlFor="rating">rating</label> */}
            {/* <select onChange={handleChange} value={review.rating}
                name="rating" id="rating" >
                <option value="">Select a rating</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select> */}

            <label htmlFor="readAt">Read At</label>
            <input
                type="date"
                name="readAt"
                id="readAt"
                value={review.readAt}  // Format date correctly
                onChange={handleChange}
            />
            <button>Save</button>
        </form>

    </section>
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'Textbox':
            return <RateByTextbox {...props}/>
        case 'Select':
            return <RateBySelect {...props}/>
        case 'Stars':
            return <RateByStars {...props}/>
    }
}

{/* <section className="dynamic-cmp">
    {selectedOption === 'Textbox' && <RateByTextbox onhandleChange={handleChange} rating={review.rating} />}
    {selectedOption === 'Select' && <RateBySelect onChange={handleChange} rating={review.rating} />}
    {selectedOption === 'Stars' && <RateByStars onChange={handleChange} rating={review.rating} />}
</section> */}